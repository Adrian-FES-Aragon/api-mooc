'use strict';
const {
  Model
} = require('sequelize');
const special = require('./special');
module.exports = (sequelize, DataTypes) => {
  class Course extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ cData, Special, Professor, Course }) {
      // define association here
      this.hasMany(cData, { foreignKey: 'courseId', as: 'cdata' }),
        this.belongsTo(Special, { foreignKey: 'specialId', as: 'special' }),
        this.belongsToMany(Professor, { through: 'lessons' }),
        Professor.belongsToMany(Course, { through: 'lessons' })
    }
    toJSON() {
      return { ...this.get(), id: undefined } // Exclude the id parameter to the POST request
    }
  }
  Course.init({
    uuid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: 'Course must have a name' },
        notEmpty: { msg: 'Name must not be empty' },
      }
    },
    area: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: 'Course must have an area' },
        notEmpty: { msg: 'Area must not be empty' },
      }
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: 'Course must have a type' },
        notEmpty: { msg: 'Type must not be empty' },
      }
    },
    language: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: 'Course must have a language' },
        notEmpty: { msg: 'Language must not be empty' },
      }
    }
  }, {
    sequelize,
    tableName: 'courses',
    modelName: 'Course',
  });
  return Course;
};