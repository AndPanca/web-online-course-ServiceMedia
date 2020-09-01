'use strict';

// ORM SETTING DATABASE
module.exports = {
  // RUN => npx sequelize db:migrate (create database migration)
  up: async (queryInterface, Sequelize) => {
    // Setting table dan field database migration dengan Sequelize
    await queryInterface.createTable('media', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      image: {
        type: Sequelize.STRING,
        allowNull: false
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false
      }
    });
  },

  // RUN => npx sequelize db:migrate:undo (delete database migration)
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('media');
  }
};
