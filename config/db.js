const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('dbmngr', 'admin', 'lKA8hN4ZKwv18jBu63z7', {
  host: 'db07012025.cxc4myquo9r8.ap-southeast-3.rds.amazonaws.com',
  dialect: 'mysql',
  logging: false, 
});

sequelize.authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

module.exports = sequelize;
