'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Special extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Course}) {
      // define association here
      this.hasMany(Course, {foreignKey: 'specialId', as: 'course'})
    }
    toJSON(){
      return { ...this.get(), id: undefined}
    }
  }

  Special.init({
    uuid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  }, {
    sequelize,
    tableName: 'specials',
    modelName: 'Special',
  });
  return Special;
};