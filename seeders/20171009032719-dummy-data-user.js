'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [{
        username: 'johndoe',
        password: 'c4bd9331357cb8dabfc8fdcbe6f03acf3b8806183334b90862f5be7c2d9a1ffe',
        role: 'teacher',
        secret: 'CjJkjrrH'
      },{
        username: 'pakdengklek',
        password: '52746179fc62cc114c0d9c59186907913669ac38030e3b3a3572470b23a30e53',
        role: 'academic',
        secret: 'ctQ2tQHk'
      },{No limit
        username: 'charlesxavier',
        password: '15908e11ed1d5e1b6d608b2afd6c78e7cfc04e59f554a38f61ef7c15229b89b1',
        role: 'headmaster',
        secret: 'af9JnwJu'
      }
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
