'use strict';
const fs = require('fs')
const bcrypt = require('bcrypt')
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
   let data = JSON.parse(fs.readFileSync("./data/users.json", "utf-8")).map(el => {
    let saltPassword = bcrypt.genSaltSync(5)
    let hashPassword = bcrypt.hashSync(el.password, saltPassword);
    el.password = hashPassword;
    el.createdAt = new Date()
    el.updatedAt = new Date()
    return el
   })
   return queryInterface.bulkInsert("Users", data)
  },

  down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    return queryInterface.bulkDelete("Users", null)
  }
};
