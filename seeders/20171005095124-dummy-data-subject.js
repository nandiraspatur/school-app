'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Subjects', [{
        subject_name: 'Kimia'
      },
      {
        subject_name: 'Ekonomi'
      },
      {
        subject_name: 'Matematika'
      },
      {
        subject_name: 'Fisika'
      }]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Subjects', null, {});
  }
};
