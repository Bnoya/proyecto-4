const Sequelize = require('sequelize');

const dbConection = require('./conection.js');

const sequelize = new Sequelize(dbConection.dbname, dbConection.user, dbConection.password, {
    host: dbConection.host,
    dialect: 'mysql',
    port: dbConection.port,
    dialectOptions: {
        multipleStatement: true,
    }
});

const db = [];

db.Sequelize = Sequelize;
db.sequelize = sequelize;

const User = require('./users.js');
db.users = new User(sequelize);


module.exports = db;
