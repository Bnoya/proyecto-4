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

const Company = require('./company.js');
db.company = new Company(sequelize);

const Location = require('./location.js');
db.location = new Location(sequelize);

const Contacts = require('./company.js');
db.contacts = new Contacts(sequelize);



module.exports = db;
