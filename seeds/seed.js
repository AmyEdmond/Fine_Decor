const sequelize = require('../config/connection');
const { User, Furniture, Role } = require('../models');

const userData = require('./userData.json');
const furnitureData = require('./furnitureData.json');
const roleData = require('./roleData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  await Role.bulkCreate(roleData, {
    individualHooks: true,
    returning: true,
  });

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
