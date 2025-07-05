import { neon } from '@neondatabase/serverless';

export async function testDatabaseConnection() {
  console.log('Testing database connection...');
  
  if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL environment variable not set");
  }

  // Log partial DATABASE_URL for debugging (without exposing credentials)
  const dbUrl = process.env.DATABASE_URL;
  const urlParts = dbUrl.split('@');
  if (urlParts.length > 1) {
    const hostPart = urlParts[1]?.split('/')[0];
    console.log(`Connecting to database host: ${hostPart || 'unknown'}`);
  }
  
  try {
    const sql = neon(process.env.DATABASE_URL);
    
    // Test basic query with timeout
    console.log('Testing basic query...');
    const result = await Promise.race([
      sql`SELECT 1 as test`,
      new Promise((_, reject) => 
        setTimeout(() => reject(new Error('Database connection timeout')), 10000)
      )
    ]);
    console.log('Basic query result:', result);
    
    // Test table existence
    console.log('Testing table existence...');
    const tables = await sql`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public'
    `;
    console.log('Available tables:', tables.map(t => t.table_name));
    
    // Test inventory table
    if (tables.find(t => t.table_name === 'inventory_items')) {
      console.log('Testing inventory_items table...');
      const count = await sql`SELECT COUNT(*) as count FROM inventory_items`;
      console.log('Inventory items count:', count[0]?.count || 0);
    }
    
    console.log('Database connection test completed successfully');
    return { success: true };
    
  } catch (error: any) {
    console.error('Database connection test failed:', error.message);
    console.error('Error details:', error);
    
    // Check for specific error types
    if (error.message.includes('ENOTFOUND')) {
      console.error('DNS resolution failed - check DATABASE_URL hostname');
    }
    if (error.message.includes('fetch failed')) {
      console.error('Network connectivity issue - check Railway database connection');
    }
    
    return { success: false, error: error.message };
  }
}