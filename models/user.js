'use strict';
const encrypt = require('../helper/encrypt')

module.exports = (sequelize, DataTypes) => {
  var User = sequelize.define('User', {
    username: DataTypes.STRING,
    password: {
      allowNull: false,
      type: DataTypes.STRING
    },
    role: DataTypes.STRING,
    secret: {
      allowNull: false,
      type: DataTypes.STRING,
      unique: {
        args: true,
        msg: 'secret sudah digunakan!!'
      },
    },
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  User.beforeCreate((user, options) => {
    user.password = encrypt(user.password, user.secret)
  });
  return User;
};
