#!/bin/bash

# Simple startup script for Railway deployment
echo "Starting inventory management server..."

# Check if dist directory exists
if [ ! -d "dist" ]; then
    echo "Error: dist directory not found. Build may have failed."
    exit 1
fi

# Check if main server file exists
if [ ! -f "dist/index.js" ]; then
    echo "Error: dist/index.js not found. Build may have failed."
    exit 1
fi

echo "Starting server with node dist/index.js"
exec node dist/index.js