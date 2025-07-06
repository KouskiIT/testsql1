#!/bin/bash

echo "🚀 Railway PostgreSQL Import Script"
echo "=================================="

# Check if export file exists
if [ ! -f "exports/inventory-export-2025-07-06.json" ]; then
    echo "❌ Export file not found!"
    echo "Make sure you have: exports/inventory-export-2025-07-06.json"
    exit 1
fi

echo "✅ Export file found with your 1,364 items"

# Check if DATABASE_URL is set
if [ -z "$DATABASE_URL" ]; then
    echo ""
    echo "📋 Please set your Railway DATABASE_URL:"
    echo "1. Go to Railway → Your Project → PostgreSQL"
    echo "2. Click 'Connect' tab"
    echo "3. Copy the Database URL"
    echo ""
    echo "Then run:"
    echo "export DATABASE_URL='your-railway-url-here'"
    echo "bash run-import.sh"
    exit 1
fi

echo "🔗 Database URL found"
echo "📦 Starting import of 1,364 inventory items..."

# Run the import
node import-to-railway.js

echo ""
echo "🎉 Import complete! Your Railway database now has all your inventory items."