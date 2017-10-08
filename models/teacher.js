'use strict';
const fullName = require('../helper/getfullname');

module.exports = (sequelize, DataTypes) => {
  var Teacher = sequelize.define('Teacher', {
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

  Teacher.prototype.getFullName = function () {
    return fullName(this.first_name, this.last_name)
  }

  Teacher.associate = model => {
    Teacher.belongsTo(model.Subject);
  }
  return Teacher;
};
