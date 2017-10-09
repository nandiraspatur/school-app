'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [{
        username: 'johndoe',
        password: 'foobar',
        role: 'teacher'
      },{
        username: 'pakdengklek',
        password: 'gogetgold',
        role: 'academic'
      },{
        username: 'charlesxavier',
        password: '030c59d4f7c436389b0dac28a1cf1d0445f5ca37bab9bd215e38fdf96e54f82d',
        role: 'headmaster',
        secret: 'H8Tf6bqY',
      }
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
