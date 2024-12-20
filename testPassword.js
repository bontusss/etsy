const bcrypt = require('bcrypt');

async function testPasswordComparison() {
  const password = 'newpassword'; // Replace with the actual password you reset to
  const hashedPassword = '$2b$10$X1mOGj//hIMkr0TUYfuuDuQP3DgT9TygEwVcQAqvzCreCzJlpbM.K'; // Replace with the actual hashed password from your DB

  // Manually compare
  const isMatch = await bcrypt.compare(password, hashedPassword);
  console.log('Password match:', isMatch); // Should log true if the comparison works correctly
}

testPasswordComparison();



