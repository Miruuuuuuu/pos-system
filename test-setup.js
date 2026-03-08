const fs = require('fs');
const path = require('path');

console.log('=== POS System Setup Check ===\n');

// Check required files
const requiredFiles = [
  'server/index.js',
  'server/models/User.js',
  'server/models/Product.js',
  'server/routes/auth.js',
  'client/package.json',
  '.env'
];

let allFilesExist = true;
requiredFiles.forEach(file => {
  const exists = fs.existsSync(path.join(__dirname, file));
  console.log(`${exists ? '✓' : '✗'} ${file}`);
  if (!exists) allFilesExist = false;
});

console.log('\n=== Dependencies Check ===\n');

// Check if node_modules exists
const backendModules = fs.existsSync(path.join(__dirname, 'node_modules'));
console.log(`${backendModules ? '✓' : '✗'} Backend node_modules`);

const frontendModules = fs.existsSync(path.join(__dirname, 'client', 'node_modules'));
console.log(`${frontendModules ? '✗' : '✗'} Frontend node_modules (needs installation)`);

console.log('\n=== Next Steps ===\n');

if (!frontendModules) {
  console.log('1. Install frontend dependencies:');
  console.log('   cd client');
  console.log('   npm install');
  console.log('   cd ..');
  console.log('');
}

console.log('2. Make sure MongoDB is running:');
console.log('   mongod');
console.log('');

console.log('3. Seed the database:');
console.log('   Double-click seed.bat');
console.log('');

console.log('4. Start the application:');
console.log('   Double-click start.bat');
console.log('');

console.log('5. Open browser to http://localhost:3000');
console.log('   Login: admin@pos.com / admin123');
