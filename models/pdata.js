'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class pData extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Professor }) {
      // define association here
      // this.belongsTo(Professor) :
      // If not specified, it will search for the name of the model + the primary key
      // = ProfesorId
      this.belongsTo(Professor, { foreignKey: 'professorId', as: 'professor' })
    }
    toJSON() {
      return { ...this.get(), id: undefined, professorId: undefined } // Exclude the id parameter to the POST request
    }
  }

  pData.init({
    uuid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: 'There must be a phone number' },
        notEmpty: { msg: 'Phone must not be empty' },
      }
    },
    degree: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: 'Please enter the academic degree' },
        notEmpty: { msg: 'Degree must not be empty' },
      }
    },
    field: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: 'There must be a field of study' },
        notEmpty: { msg: 'Field must not be empty' },
      }
    },
    charge: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: 'There must be a charge' },
        notEmpty: { msg: 'Charge must not be empty' },
      }
    },
    school: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: "There must be a school name" },
        notEmpty: { msg: "School name must not be empty" },
      }
    },
    biography: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: 'There must be a bio' },
        notEmpty: { msg: 'Biography must not be empty' },
      }
    },
  }, {
    sequelize,
    modelName: 'pData',
  });
  return pData;
};