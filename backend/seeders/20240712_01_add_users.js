const bcrypt = require('bcrypt')
const createTestUsers = async () => {
    const testUsers = [
        {
            "username": "kenny",
            "password": await bcrypt.hash('kennedy', 1),
            "is_admin": true
        },
        {
            "username": "rose",
            "password": await bcrypt.hash('jackie', 1),
            "is_admin": false
        },
        {
            "username": "kennedy",
            "password": await bcrypt.hash('cream', 1),
            "is_admin": false
        },
        {
            "username": "jackie",
            "password": await bcrypt.hash('treat', 1),
            "is_admin": false
        }
    ];

    return testUsers
}
  
  module.exports = {
    up: async ({ context: queryInterface }) => {
      const testUsers = await createTestUsers()
      await queryInterface.bulkInsert('users', testUsers);
      },
    down: async ({ context: queryInterface }) => {
      await queryInterface.bulkDelete('users', null, {});
      },
    };