const { DataTypes } = require('sequelize');

const Role = {
  USER: 'USER',
  ADMIN: 'ADMIN',
};

const AccountStatus = {
  ACTIVE: 'ACTIVE',
  INACTIVE: 'INACTIVE',
  SUSPENDED: 'SUSPENDED',
};

module.exports = { Role, AccountStatus };
