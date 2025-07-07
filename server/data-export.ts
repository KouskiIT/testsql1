import { neon } from '@neondatabase/serverless';
import fs from 'fs';
import path from 'path';

// Simple CLI export when run directly
if (import.meta.url === `file://${process.argv[1]}`) {
  exportInventoryData().then(result => {
    console.log('✅ Export completed:', result);
    process.exit(0);
  }).catch(error => {
    console.error('❌ Export failed:', error.message);
    process.exit(1);
  });
}

export async function exportInventoryData() {
  if (!process.env.DATABASE_URL) {
    throw new Error('DATABASE_URL environment variable is required');
  }

  console.log('Exporting inventory data...');
  
  try {
    const sql = neon(process.env.DATABASE_URL);
    
    // Export inventory items
    const items = await sql`SELECT * FROM inventory_items ORDER BY id`;
    console.log(`Found ${items.length} inventory items`);
    
    // Export supporting data
    const users = await sql`SELECT * FROM users`;
    const searchResults = await sql`SELECT * FROM search_results`;
    const deletedItems = await sql`SELECT * FROM deleted_items`;
    const auditLog = await sql`SELECT * FROM audit_log ORDER BY timestamp DESC LIMIT 100`;
    
    const exportData = {
      timestamp: new Date().toISOString(),
      total_items: items.length,
      data: {
        inventory_items: items,
        users: users,
        search_results: searchResults,
        deleted_items: deletedItems,
        audit_log: auditLog
      }
    };
    
    // Save to file
    const exportDir = path.join(process.cwd(), 'exports');
    if (!fs.existsSync(exportDir)) {
      fs.mkdirSync(exportDir, { recursive: true });
    }
    
    const filename = `inventory-export-${new Date().toISOString().split('T')[0]}.json`;
    const filepath = path.join(exportDir, filename);
    
    fs.writeFileSync(filepath, JSON.stringify(exportData, null, 2));
    
    console.log(`Data exported to: ${filepath}`);
    console.log(`Items exported: ${items.length}`);
    
    return { success: true, filename, itemCount: items.length };
    
  } catch (error: any) {
    console.error('Export failed:', error.message);
    throw error;
  }
}

export async function importInventoryData(importData: any) {
  if (!process.env.DATABASE_URL) {
    throw new Error('DATABASE_URL environment variable is required');
  }

  console.log('Importing inventory data...');
  
  try {
    const sql = neon(process.env.DATABASE_URL);
    
    if (importData.data?.inventory_items) {
      console.log(`Importing ${importData.data.inventory_items.length} inventory items...`);
      
      for (const item of importData.data.inventory_items) {
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
            ON CONFLICT (code_barre) DO UPDATE SET
              num_inventaire = EXCLUDED.num_inventaire,
              departement = EXCLUDED.departement,
              designation = EXCLUDED.designation,
              date_modification = now()
          `;
        } catch (error: any) {
          console.log(`Skipping duplicate item: ${item.code_barre}`);
        }
      }
    }
    
    console.log('Data import completed');
    return { success: true };
    
  } catch (error: any) {
    console.error('Import failed:', error.message);
    throw error;
  }
}