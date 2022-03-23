'use strict';
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable('pData', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      uuid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      phone: {
        type: DataTypes.STRING,
        allowNull: false
      },
      degree: {
        type: DataTypes.STRING,
        allowNull: false
      },
      field: {
        type: DataTypes.STRING,
        allowNull: false
      },
      charge: {
        type: DataTypes.STRING,
        allowNull: false
      },
      school: {
        type: DataTypes.STRING,
        allowNull: false
      },
      biography: {
        type: DataTypes.STRING,
        allowNull: false
      },
      professorId: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE
      }
    });
  },
  async down(queryInterface, DataTypes) {
    await queryInterface.dropTable('pData');
  }
};