'use strict';
module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.Sequelize.Model
  class Comic extends Model {}
  Comic.init({
    title: {type: DataTypes.STRING,
    validate: {
      notNull: {msg: "title must be filled"},
      notEmpty: {msg:"title must be filled"}
    }, allowNull: false
  },
    author: {type: DataTypes.STRING,
      validate: {
        notNull: {msg: "author must be filled"},
        notEmpty: {msg:"author must be filled"}
      }, allowNull: false
    },
    imageUrl: DataTypes.STRING,
    UserId: DataTypes.INTEGER
  }, {sequelize})
  Comic.associate = function(models) {
    // associations can be defined here
    Comic.belongsTo(models.User)
  };
  return Comic;
};