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
        password: 'magnetowhy',
        role: 'headmaster'
      }
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
