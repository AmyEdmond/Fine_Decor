const sequelize = require('../config/connection');
const { User, Furniture } = require('../models');

const userData = require('./userData.json');
const furnitureData = require('./furnitureData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  await Furniture.bulkCreate(furnitureData, {
    returning: true,
  });

  process.exit(0);
};

seedDatabase();
