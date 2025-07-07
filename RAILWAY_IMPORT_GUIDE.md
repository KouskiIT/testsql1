# How to Import Your 1,364 Items to Railway PostgreSQL

## Step 1: Get Your Railway Database URL

1. Go to your Railway project
2. Click on the **PostgreSQL service**
3. Go to **Connect** tab
4. Copy the **Database URL** (starts with `postgresql://`)

## Step 2: Import Your Data

### Option A: Use the Import Script (Recommended)

1. Download these files to your computer:
   - `import-to-railway.js`
   - `exports/inventory-export-2025-07-06.json` (your 1,364 items)

2. Open terminal/command prompt in the same folder

3. Set your Railway database URL:
   ```bash
   # Replace with your actual Railway URL
   export DATABASE_URL="postgresql://postgres:password@host:port/database"
   ```

4. Run the import:
   ```bash
   node import-to-railway.js
   ```

### Expected Output:
```
🔗 Connecting to Railway PostgreSQL...
✅ Connected successfully
📋 Creating database tables...
✅ Tables created
📦 Found 1364 items to import
⏳ Imported 100/1364...
⏳ Imported 200/1364...
...
🎉 Import completed!
✅ Imported: 1364 items
📊 Total items in database: 1364
```

## Step 3: Deploy Your App

1. Upload your app code to Railway
2. Set environment variables:
   ```
   DATABASE_URL = your-railway-database-url
   SESSION_SECRET = any-random-string
   NODE_ENV = production
   ```
3. Deploy

## Option B: Include Data in Deployment

Use the `railway-postgresql-deployment.tar.gz` package which includes:
- Complete app code
- Your export data
- Automatic import on startup

## Verification

After import, your Railway app will show:
- **Total Items**: 1,364
- **Departments**: ADG, BDAM, CINFO, CUBASE, etc.
- **All Features**: Search, barcode scanning, Excel export

Your complete inventory system will be running on Railway with all your existing data!