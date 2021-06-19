const bcrypt = require("bcrypt");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("users", [
      {
        name: "Sura Sanjaya",
        profession: "Backend Developer Tokopedia",
        role: "student",
        email: "surasanjaya@gmail.com",
        password: await bcrypt.hash("rahasia1234", 10),
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "Surax Sanjaya",
        profession: "Backend Developer Tokopedia",
        role: "student",
        email: "surasanjayax@gmail.com",
        password: await bcrypt.hash("rahasia1234", 10),
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("users", null, {});
  },
};
