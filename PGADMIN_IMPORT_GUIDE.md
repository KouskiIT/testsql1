# Import Your 1,364 Inventory Items Using pgAdmin

## Files Created for You:
✅ `pgadmin-create-tables.sql` - Creates all database tables
✅ `inventory-data.csv` - Your 1,364 items in CSV format

## Step 1: Connect to Your Database in pgAdmin

1. Open pgAdmin
2. Add new server connection:
   - **Host**: Your Railway PostgreSQL host
   - **Port**: 5432 (usually)
   - **Database**: Your database name
   - **Username**: postgres (usually)
   - **Password**: Your database password

## Step 2: Create Tables

1. Right-click your database → **Query Tool**
2. Open `pgadmin-create-tables.sql`
3. Copy all content and paste into Query Tool
4. Click **Execute** (▶️ button)
5. You should see: "Query returned successfully"

## Step 3: Import CSV Data

### Method A: Using pgAdmin Import Tool

1. Right-click `inventory_items` table → **Import/Export Data**
2. Choose **Import**
3. Select `inventory-data.csv` file
4. Configure import settings:
   - **Format**: CSV
   - **Header**: Yes (first row contains column names)
   - **Delimiter**: Comma
   - **Quote**: Double quote
   - **Encoding**: UTF8

### Method B: Using SQL COPY Command

In Query Tool, run:
```sql
COPY inventory_items (
    code_barre, num_inventaire, old_num_inventaire, departement, num_bureau,
    beneficiaire, designation, quantite, num_serie, condition, description,
    prix, categorie, chemin_image, custom_fields, date_ajouter, date_modification
) 
FROM '/path/to/inventory-data.csv' 
DELIMITER ',' 
CSV HEADER;
```

## Step 4: Verify Import

Run this query to check your data:
```sql
-- Check total count
SELECT COUNT(*) as total_items FROM inventory_items;

-- Check by department
SELECT departement, COUNT(*) as count 
FROM inventory_items 
GROUP BY departement 
ORDER BY count DESC;

-- Sample data
SELECT * FROM inventory_items LIMIT 10;
```

## Expected Results:
- **Total items**: 1,364
- **Departments**: ADG, BDAM, CINFO, CUBASE, etc.
- **All fields**: Barcodes, inventory numbers, descriptions, prices

## Step 5: Deploy Your App

After importing data, deploy your app with:
- `DATABASE_URL` pointing to your PostgreSQL
- `SESSION_SECRET` as any random string

Your inventory management system will connect to the populated database with all 1,364 items ready to use!