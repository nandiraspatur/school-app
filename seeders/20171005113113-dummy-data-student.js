'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Students', [{
        first_name: 'Nandi',
        last_name: 'Paturohman',
        email: 'nsp@gm.com',
      }{
        first_name: 'Ramadan',
        last_name: 'Dani',
        email: 'ramadan01@gm.com',
      }{
        first_name: 'Septiani',
        last_name: 'Putri',
        email: 'septiani16@gm.com',
      }]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Subjects', null, {});
  }
};
