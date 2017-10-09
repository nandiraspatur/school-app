'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Students', [{
        first_name: 'Nandi',
        last_name: 'Paturohman',
        email: 'nsp@gm.com',
      }]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Subjects', null, {});
  }
};
