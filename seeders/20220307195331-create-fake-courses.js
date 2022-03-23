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
      'courses',
      [
        {
          uuid: "00d575fd-33aa-432a-adeb-382fd0f68d3a",
          name: "Sumas y restas",
          area: "Math",
          type: "MOOC",
          language: "english",
          specialId: "PE",
          createdAt: "2022-03-07 19:28:31.000",
          updatedAt: "2022-03-07 19:28:31.000"
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
    await queryInterface.bulkDelete('courses', null, {});
  }
};
