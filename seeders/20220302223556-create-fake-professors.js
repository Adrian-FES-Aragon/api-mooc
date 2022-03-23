'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */

    await queryInterface.bulkInsert(
      'professors',
      [
        {
          uuid: 'd55dc13a-ef84-493e-acce-055ec617f5ba',
          firstname: 'John',
          lastname: 'Doe',
          email: 'jhon@email.com',
          createdAt: '2022-03-02 22:32:41.434',
          updatedAt: '2022-03-02 22:32:41.434',
        },
        {
          uuid: 'd55dc13a-ef84-493e-acce-055ec097f5ba',
          firstname: 'Jane',
          lastname: 'Doe',
          email: 'jane@email.com',
          updatedAt: '2022-03-02 22:32:41.434',
          createdAt: '2022-03-02 22:32:41.434',
        },
      ], {});
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('professors', null, {});
  }
};
