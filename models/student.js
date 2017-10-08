'use strict';
const fullName = require('../helper/getfullname');

module.exports = (sequelize, DataTypes) => {
  var Student = sequelize.define('Student', {
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      unique: {
          args: true,
          msg: 'Email sudah digunakan!!'
        },
      validate: {
        isEmail: {
          args: true,
          msg: 'Format email salah!!'
        }
      },
    }
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });

  Student.prototype.getFullName = function () {
    return fullName(this.first_name, this.last_name)
  }
  
  Student.associate = model => {
    Student.hasMany(model.StudentSubject);
    Student.belongsToMany(model.Subject, { through: model.StudentSubject });
  }
  return Student;
};
