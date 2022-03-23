'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Professor extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ pData, Course, Professor }) {
      // define association here
      this.hasMany(pData, { foreignKey: 'professorId', as: 'pdata' }),
        this.belongsToMany(Course, { through: 'lessons' }),
        Course.belongsToMany(Professor, { through: 'lessons' })

        //User.belongsToMany(Team, { through: 'users_teams'});
        //Team.belongsToMany(User, { through: 'users_teams'});
    }
    toJSON() {
      return { ...this.get(), id: undefined } // Exclude the id parameter to the POST request
    }
  }
  Professor.init({
    uuid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    firstname: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: 'Professor must have a name' },
        notEmpty: { msg: 'Name must not be empty' },
      }
    },
    lastname: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: 'Professor must have a last name' },
        notEmpty: { msg: 'Last name must not be empty' },
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: 'Professor must have an email' },
        notEmpty: { msg: 'Email must not be null' },
        isEmail: { msg: 'Please enter a valid email' },
      }
    },
  }, {
    sequelize,
    tableName: 'professors',
    modelName: 'Professor',
  });
  return Professor;
};