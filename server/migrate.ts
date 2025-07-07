import { neon } from '@neondatabase/serverless';

export async function runMigrations() {
  if (!process.env.DATABASE_URL) {
    throw new Error('DATABASE_URL environment variable is required');
  }

  console.log('Running database migrations...');
  
  try {
    const sql = neon(process.env.DATABASE_URL);

    // Create tables if they don't exist
    console.log('Creating database tables...');
    
    // Create sessions table (required for auth)
    await sql`
      CREATE TABLE IF NOT EXISTS "sessions" (
        "sid" varchar PRIMARY KEY NOT NULL,
        "sess" jsonb NOT NULL,
        "expire" timestamp NOT NULL
      );
    `;
    
    await sql`
      CREATE INDEX IF NOT EXISTS "IDX_session_expire" ON "sessions" ("expire");
    `;

    // Create users table (required for auth)
    await sql`
      CREATE TABLE IF NOT EXISTS "users" (
        "id" varchar PRIMARY KEY NOT NULL,
        "email" varchar,
        "first_name" varchar,
        "last_name" varchar,
        "profile_image_url" varchar,
        "created_at" timestamp DEFAULT now(),
        "updated_at" timestamp DEFAULT now()
      );
    `;
    
    await sql`
      CREATE UNIQUE INDEX IF NOT EXISTS "users_email_unique" ON "users" ("email");
    `;

    // Create inventory_items table
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

    await sql`
      CREATE UNIQUE INDEX IF NOT EXISTS "inventory_items_code_barre_unique" ON "inventory_items" ("code_barre");
    `;
    
    await sql`
      CREATE UNIQUE INDEX IF NOT EXISTS "inventory_items_num_inventaire_unique" ON "inventory_items" ("num_inventaire");
    `;

    // Create search_results table
    await sql`
      CREATE TABLE IF NOT EXISTS "search_results" (
        "id" serial PRIMARY KEY NOT NULL,
        "query" text NOT NULL,
        "results" jsonb NOT NULL,
        "timestamp" timestamp DEFAULT now() NOT NULL
      );
    `;

    // Create deleted_items table
    await sql`
      CREATE TABLE IF NOT EXISTS "deleted_items" (
        "id" serial PRIMARY KEY NOT NULL,
        "original_item_id" integer NOT NULL,
        "item_data" jsonb NOT NULL,
        "deleted_at" timestamp DEFAULT now() NOT NULL,
        "deleted_by" varchar
      );
    `;

    // Create audit_log table
    await sql`
      CREATE TABLE IF NOT EXISTS "audit_log" (
        "id" serial PRIMARY KEY NOT NULL,
        "action" varchar(50) NOT NULL,
        "table_name" varchar(50) NOT NULL,
        "record_id" integer,
        "old_values" jsonb,
        "new_values" jsonb,
        "user_id" varchar,
        "timestamp" timestamp DEFAULT now() NOT NULL,
        "description" text
      );
    `;

    console.log('Database migrations completed successfully');
    return true;
    
  } catch (error: any) {
    console.error('Migration failed:', error.message);
    throw error;
  }
}