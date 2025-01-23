const { DataTypes } = require('sequelize');
const sequelize = require('../config/db'); 
const { Role } = require('./Role'); 

const User = sequelize.define('users', {
  id: {
    type: DataTypes.STRING,
    primaryKey: true,
    allowNull: false,
    defaultValue: DataTypes.UUIDV4, 
  },
  fullName: {
    type: DataTypes.STRING,
    field: 'full_name',
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  phoneNumber: {
    type: DataTypes.STRING,
    field: 'phone_number', 
    allowNull: true,
  },
  profileIcon: {
    type: DataTypes.STRING,
    field: 'profile_icon', 
    allowNull: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  role: {
    type: DataTypes.ENUM(...Object.values(Role)),
    allowNull: false,
    defaultValue: Role.USER,
  },
  accountStatus: {
    type: DataTypes.ENUM('UNVERIFIED', 'VERIFIED', 'BLOCKED'),  
    field: 'account_status', 
    allowNull: false,
    defaultValue: 'UNVERIFIED',
  },
  createdAt: {
    type: DataTypes.DATE,
    field: 'created_at',
    allowNull: false,
    defaultValue: DataTypes.NOW, 
  },
  updatedAt: {
    type: DataTypes.DATE,
    field: 'updated_at',
    allowNull: true,
    defaultValue: DataTypes.NOW,
    onUpdate: DataTypes.NOW,
  },
}, {
  timestamps: true, 
  createdAt: 'created_at',
  updatedAt: 'updated_at',
});

module.exports = User;
