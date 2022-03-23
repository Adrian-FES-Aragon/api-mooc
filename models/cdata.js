'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class cData extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Course }) {
      // define association here
      this.belongsTo(Course, { foreignKey: 'courseId', as: 'course' })
    }
    toJSON() {
      return { ...this.get(), id: undefined, courseId: undefined } // Exclude the id parameter to the POST request
    }
  }
  cData.init({
    uuid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    link: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: 'Course must have a link' },
        notEmpty: { msg: 'Link must not be empty' },
      }
    },
    school: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: 'Course must have a school' },
        notEmpty: { msg: 'School must not be empty' },
      }
    },
    keywords: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: 'Course must have keywords' },
        notEmpty: { msg: 'Keywords must not be empty' },
      }
    },
    content: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: 'Course must have a content' },
        notEmpty: { msg: 'Content must not be empty' },
      }
    },
    purpose: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: 'Course must have a purpose' },
        notEmpty: { msg: 'Purpose must not be empty' },
      }
    },
  }, {
    sequelize,
    modelName: 'cData',
  });
  return cData;
};