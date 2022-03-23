'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ProfessorCourse extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate() {
      // define association here
    }
    toJSON(){
      return { ...this.get(), id: undefined}
    }
  }
  ProfessorCourse.init({
    professorId: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: 'Professor must have a valid Course' },
        notEmpty: { msg: 'Course must not be empty' },
      }
    },
    courseId: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: 'Course must have a valid Professor' },
        notEmpty: { msg: 'Professor must not be empty' },
      }
    },
  }, {
    sequelize,
    tableName: 'lessons',
    modelName: 'ProfessorCourse',
  });
  return ProfessorCourse;
};