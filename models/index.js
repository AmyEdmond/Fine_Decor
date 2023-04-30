const User = require('./User');
const Role = require('./Role'); // Import the Role model
const Furniture = require('./Furniture')

User.belongsTo(Role, {
  foreignKey: 'role_id',
});

Role.hasMany(User, {
  foreignKey: 'role_id',
});

module.exports = { User, Role };


module.exports = { User, Role, Furniture };
