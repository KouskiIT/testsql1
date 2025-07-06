const { neon } = require('@neondatabase/serverless');
const fs = require('fs');
const path = require('path');

async function importToRailway() {
  // Your Railway PostgreSQL URL - replace with your actual URL
  const DATABASE_URL = process.env.DATABASE_URL || 'postgresql://postgres:password@host:port/database';
  
  if (!DATABASE_URL || DATABASE_URL.includes('password@host')) {
    console.log('❌ Please set your Railway DATABASE_URL');
    console.log('Get it from: Railway Project → PostgreSQL Service → Connect');
    return;
  }

  try {
    console.log('🔗 Connecting to Railway PostgreSQL...');
    const sql = neon(DATABASE_URL);
    
    // Test connection
    await sql`SELECT 1 as test`;
    console.log('✅ Connected successfully');
    
    // Create tables first
    console.log('📋 Creating database tables...');
    
    await sql`
      CREATE TABLE IF NOT EXISTS "inventory_items" (
        "id" serial PRIMARY KEY NOT NULL,
        "code_barre" text NOT NULL,
        "num_inventaire" text NOT NULL,
        "old_num_inventaire" text,
        "departement" text NOT NULL,
        "num_bureau" text NOT NULL,
        "beneficiaire" text NOT NULL,
        "designation" text NOT NULL,
        "quantite" integer DEFAULT 1 NOT NULL,
        "num_serie" text,
        "condition" text NOT NULL,
        "description" text,
        "prix" numeric(12, 2) NOT NULL,
        "categorie" text NOT NULL,
        "chemin_image" text,
        "custom_fields" jsonb DEFAULT '{}',
        "date_ajouter" timestamp DEFAULT now() NOT NULL,
        "date_modification" timestamp DEFAULT now() NOT NULL
      );
    `;
    
    await sql`CREATE UNIQUE INDEX IF NOT EXISTS "inventory_items_code_barre_unique" ON "inventory_items" ("code_barre");`;
    await sql`CREATE UNIQUE INDEX IF NOT EXISTS "inventory_items_num_inventaire_unique" ON "inventory_items" ("num_inventaire");`;
    
    console.log('✅ Tables created');
    
    // Read export data
    const exportFile = path.join(__dirname, 'exports', 'inventory-export-2025-07-06.json');
    if (!fs.existsSync(exportFile)) {
      console.log('❌ Export file not found:', exportFile);
      console.log('Make sure you have the exports folder with your data');
      return;
    }
    
    const exportData = JSON.parse(fs.readFileSync(exportFile, 'utf8'));
    const items = exportData.data.inventory_items;
    
    console.log(`📦 Found ${items.length} items to import`);
    
    // Import data
    let imported = 0;
    let skipped = 0;
    
    for (const item of items) {
      try {
        await sql`
          INSERT INTO inventory_items (
            code_barre, num_inventaire, old_num_inventaire, departement, num_bureau, 
            beneficiaire, designation, quantite, num_serie, condition, description, 
            prix, categorie, chemin_image, custom_fields, date_ajouter, date_modification
          ) VALUES (
            ${item.code_barre}, ${item.num_inventaire}, ${item.old_num_inventaire}, 
            ${item.departement}, ${item.num_bureau}, ${item.beneficiaire}, ${item.designation}, 
            ${item.quantite}, ${item.num_serie}, ${item.condition}, ${item.description}, 
            ${item.prix}, ${item.categorie}, ${item.chemin_image}, ${item.custom_fields}, 
            ${item.date_ajouter}, ${item.date_modification}
          )
        `;
        imported++;
        
        if (imported % 100 === 0) {
          console.log(`⏳ Imported ${imported}/${items.length}...`);
        }
      } catch (error) {
        if (error.message.includes('duplicate key')) {
          skipped++;
        } else {
          console.log(`⚠️ Error with item ${item.code_barre}: ${error.message}`);
        }
      }
    }
    
    console.log('🎉 Import completed!');
    console.log(`✅ Imported: ${imported} items`);
    console.log(`⏭️ Skipped: ${skipped} duplicates`);
    
    // Verify
    const count = await sql`SELECT COUNT(*) as total FROM inventory_items`;
    console.log(`📊 Total items in database: ${count[0].total}`);
    
  } catch (error) {
    console.log('❌ Import failed:', error.message);
  }
}

// Run import
importToRailway();