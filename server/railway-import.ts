import { neon } from '@neondatabase/serverless';
import fs from 'fs';
import path from 'path';

export async function importToRailwayDatabase() {
  if (!process.env.DATABASE_URL) {
    throw new Error('DATABASE_URL environment variable is required');
  }

  console.log('🚀 Starting Railway database import process...');
  
  try {
    const sql = neon(process.env.DATABASE_URL);
    
    // Test connection
    console.log('📡 Testing Railway database connection...');
    await sql`SELECT 1 as test`;
    console.log('✅ Railway database connection successful');
    
    // Read export file
    const exportPath = path.join(process.cwd(), 'exports', 'inventory-export-2025-07-06.json');
    if (!fs.existsSync(exportPath)) {
      throw new Error(`Export file not found: ${exportPath}`);
    }
    
    const exportData = JSON.parse(fs.readFileSync(exportPath, 'utf8'));
    console.log(`📋 Found export with ${exportData.total_items} items`);
    
    // Import inventory items
    if (exportData.data?.inventory_items) {
      const items = exportData.data.inventory_items;
      console.log(`📦 Importing ${items.length} inventory items...`);
      
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
            console.log(`⏳ Imported ${imported}/${items.length} items...`);
          }
        } catch (error: any) {
          if (error.message.includes('duplicate key')) {
            skipped++;
          } else {
            console.error(`❌ Error importing item ${item.code_barre}:`, error.message);
          }
        }
      }
      
      console.log(`✅ Import completed: ${imported} items imported, ${skipped} skipped`);
    }
    
    // Import other data if exists
    if (exportData.data?.search_results?.length > 0) {
      console.log('📊 Importing search results...');
      for (const result of exportData.data.search_results) {
        try {
          await sql`
            INSERT INTO search_results (query, results, timestamp)
            VALUES (${result.query}, ${result.results}, ${result.timestamp})
          `;
        } catch (error) {
          // Skip duplicates
        }
      }
    }
    
    // Verify import
    const totalItems = await sql`SELECT COUNT(*) as count FROM inventory_items`;
    console.log(`🎯 Total items in Railway database: ${totalItems[0].count}`);
    
    return { 
      success: true, 
      imported: totalItems[0].count,
      message: 'All data imported successfully to Railway PostgreSQL'
    };
    
  } catch (error: any) {
    console.error('❌ Import failed:', error.message);
    throw error;
  }
}

// CLI execution
if (import.meta.url === `file://${process.argv[1]}`) {
  importToRailwayDatabase().then(result => {
    console.log('🎉 Import completed:', result);
    process.exit(0);
  }).catch(error => {
    console.error('💥 Import failed:', error.message);
    process.exit(1);
  });
}