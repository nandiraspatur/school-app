'use strict';
const getletterscore = require('../helper/getletterscore')

module.exports = (sequelize, DataTypes) => {
  var StudentSubject = sequelize.define('StudentSubject', {
    StudentId: DataTypes.INTEGER,
    SubjectId: DataTypes.INTEGER,
    score: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });

  StudentSubject.prototype.getLetterScore = function(){
    return getletterscore(this.score)
  }

  StudentSubject.associate = model => {
    StudentSubject.belongsTo(model.Student);
    StudentSubject.belongsTo(model.Subject);
  }
  return StudentSubject;
};
