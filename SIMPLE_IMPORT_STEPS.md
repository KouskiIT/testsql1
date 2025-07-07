# Simple Steps to Import Your 1,364 Items

## Step 1: Get Railway Database URL

1. Go to Railway.app
2. Open your project
3. Click on **PostgreSQL** service
4. Click **Connect** tab
5. Copy the **Database URL** (looks like: `postgresql://postgres:abc123@hostname:5432/railway`)

## Step 2: Run Import

### Option A: Using the Script (Easy)

1. In your terminal, set the database URL:
```bash
export DATABASE_URL="postgresql://postgres:your-password@your-host:5432/railway"
```

2. Run the import:
```bash
bash run-import.sh
```

### Option B: Direct Command

```bash
DATABASE_URL="your-railway-url" node import-to-railway.js
```

## What You'll See

```
🚀 Railway PostgreSQL Import Script
==================================
✅ Export file found with your 1,364 items
🔗 Database URL found
📦 Starting import of 1,364 inventory items...
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

After import, deploy your app to Railway:
1. Upload your code
2. Set `DATABASE_URL` (same as above)
3. Set `SESSION_SECRET=any-random-string`
4. Deploy

Your inventory system will be live with all 1,364 items!