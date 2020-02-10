'use strict';
const bcrypt = require('bcrypt')
const saltRound = 5
module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.Sequelize.Model
  class User extends Model{}
  User.init({
    name: {type: DataTypes.STRING,
      validate: {
        notNull: {msg: "name must be filled"},
        notEmpty: {msg:"name must be filled"}
      }, allowNull: false
    },
    email: {type: DataTypes.STRING,
      validate: {
        notNull: {msg: "email must be filled"},
        notEmpty: {msg:"email must be filled"},
        isEmail:{msg: "wronf format email"}
      }, allowNull: false
    },
    password: {type: DataTypes.STRING,
      validate: {
        notNull: {msg: "password must be filled"},
        notEmpty: {msg:"password must be filled"}
      }, allowNull: false
    }
  }, {sequelize,
  hooks: {
    beforeCreate (user, option) {
      user.password = bcrypt.hashSync(user.password, saltRound)
    }
  }
  })
  User.associate = function(models) {
    // associations can be defined here
    User.hasMany(models.Comic)
  };
  return User;
};