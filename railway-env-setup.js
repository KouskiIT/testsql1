#!/usr/bin/env node

// Railway environment setup script
// This ensures all environment variables are properly configured

console.log('[Railway Setup] Configuring environment variables...');

// Log environment status
console.log('Environment Status:');
console.log('- NODE_ENV:', process.env.NODE_ENV || 'not set');
console.log('- PORT:', process.env.PORT || 'not set');
console.log('- DATABASE_URL:', process.env.DATABASE_URL ? 'set' : 'not set');
console.log('- SESSION_SECRET:', process.env.SESSION_SECRET ? 'set' : 'not set');

// Validate required variables
const requiredVars = ['DATABASE_URL', 'SESSION_SECRET'];
const missingVars = requiredVars.filter(varName => !process.env[varName]);

if (missingVars.length > 0) {
  console.error(`[Railway Setup] Missing required environment variables: ${missingVars.join(', ')}`);
  process.exit(1);
}

// Set production environment if not set
if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = 'production';
  console.log('[Railway Setup] Set NODE_ENV to production');
}

// Validate and set PORT
const port = process.env.PORT || '3000';
const portInt = parseInt(port, 10);
if (isNaN(portInt) || portInt < 0 || portInt > 65535) {
  console.error(`[Railway Setup] Invalid PORT: ${port}`);
  process.exit(1);
}

console.log(`[Railway Setup] Environment configured successfully`);
console.log(`[Railway Setup] Starting server on port ${port}...`);

// Start the server
const { spawn } = require('child_process');
const server = spawn('node', ['dist/index.js'], {
  stdio: 'inherit',
  env: process.env
});

server.on('error', (error) => {
  console.error(`[Railway Setup] Server error: ${error.message}`);
  process.exit(1);
});

server.on('exit', (code) => {
  console.log(`[Railway Setup] Server exited with code ${code}`);
  process.exit(code);
});