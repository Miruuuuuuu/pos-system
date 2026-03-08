console.log('Testing route imports...\n');

try {
  const auth = require('./server/routes/auth');
  console.log('✓ auth:', typeof auth);
} catch (e) {
  console.log('✗ auth:', e.message);
}

try {
  const products = require('./server/routes/products');
  console.log('✓ products:', typeof products);
  console.log('  Keys:', Object.keys(products));
  console.log('  Constructor:', products.constructor.name);
} catch (e) {
  console.log('✗ products:', e.message);
}

try {
  const sales = require('./server/routes/sales');
  console.log('✓ sales:', typeof sales);
} catch (e) {
  console.log('✗ sales:', e.message);
}

try {
  const customers = require('./server/routes/customers');
  console.log('✓ customers:', typeof customers);
} catch (e) {
  console.log('✗ customers:', e.message);
}

try {
  const reports = require('./server/routes/reports');
  console.log('✓ reports:', typeof reports);
} catch (e) {
  console.log('✗ reports:', e.message);
}

try {
  const settings = require('./server/routes/settings');
  console.log('✓ settings:', typeof settings);
} catch (e) {
  console.log('✗ settings:', e.message);
}
