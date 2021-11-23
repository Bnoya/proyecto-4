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

const Contact = require('./contacts.js');
db.contact = new Contact(sequelize);

const User = require('./users.js');
db.users = new User(sequelize);

const Company = require('./company.js');
db.company = new Company(sequelize);

const Location = require('./location.js');
db.location = new Location(sequelize);

const ContactChannel = require('./contactChannel.js');
db.contactChannel = new ContactChannel(sequelize);

const ChannelType = require('./ChannelType.js');
db.channelType = new ChannelType(sequelize);

module.exports = db;
