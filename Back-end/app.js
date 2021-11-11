const express = require('express');
const morgan = require('morgan');
const jwt = require('jsonwebtoken');
const { users } = require('./objects/index.js');
const cors = require('cors');
const db = require('./objects/index.js');
const app = express();


db.sequelize.sync();

app.use(cors());
app.use(express.json());
app.use(morgan(':method :url :status :res[content-length] - :response-time ms'));
const SECRET_KEY = 'lifeisgood';

//middelWare:

const authenticateUser = (req, res, next) => {
    const nonSecurePaths = ['/user/login'];
    if (nonSecurePaths.includes(req.path)) return next();
    
    const authHead = req.headers['authorization'];
    if (authHead) {
        const token = authHead.split(' ')[1];
        jwt.verify(token, SECRET_KEY, async (err, user) => {
            req.user = user;
            if(err){
                res.status(401).send({message: 'Invalid Token'})
            }
            next();
        })
    }else {
        res.status(401).send({message: 'No token provided'})
    }
}

const isAdmin = (req, res, next) => {
    if (req.user.userRole != 1) {
        res.status(404).send({message:'unAuthorized user'});
    } else {
        next();
    }
}

app.use(authenticateUser);
//Users Routes:
app.post('/user/login', async (req, res) => {
    const username = req.body.username;
    const pass = req.body.pass;

    const user = await db.users.loginUser(username, pass);
    if(user.loginSuccess){
        const accessToken = jwt.sign({
            userId: user.id,
            username: user.username,
            pass: user.pass,
            userRole: user.user_role
        }, SECRET_KEY);
        res.send({
            message: 'Login Successfull',
            userId: user.id,
            token: accessToken
        });
    } else {
        res.send({message: 'Incorrect username or password'})
    }
});


app.post('/create-user', isAdmin, async (req, res) => {
    if (!(req.body.first_name && req.body.last_name && req.body.pass && req.body.username)) {
        console.log('data format if');
        return res.status(400).send({ error: "Data not formatted properly" });
    }
    req.body.user_role_id = 2;
    console.log('previo a funcion')
    const new_user = await db.users.newUser(req.body);
    if (new_user == false){
        res.status(500).send({message: 'couldnt create user'})
    } else {
        res.status(201).send({message: 'User Created'})
    }
});



//Location Routs

app.get('/regiontree', async (req, res) => {
    const region = await db.location.getLocationDescription();
        res.send(region);
});

app.get('/regions', async (req, res) => {
    const region = await db.location.querryAllRegions();
        res.send(region);
});
app.get('/regions/:id', async (req, res) => {
    const region = await db.location.querryRegionsById(req.params.id);
        res.send(region);
});
app.get('/country', async (req, res) => {
    const country = await db.location.querryAllCountries();
        res.send(country);
});
app.get('/country/:region', async (req, res) => {
    const countryRedion = await db.location.querryCountryByRegion(req.params.region);
        res.send(countryRedion);
});

app.get('/country/id/:id', async (req, res) => {
    console.log('entre en ruta');
    const countryRedion = await db.location.querryCountryById(req.params.id);
        res.send(countryRedion);
});

app.get('/city', async (req, res) => {
    const city = await db.location.querryAllCities();
        res.send(city);
});
app.get('/city/:country', async (req, res) => {
    const city_country = await db.location.querryCitiesByCountry(req.params.country);
        res.send(city_country);
});
app.get('/cityId/:id', async (req, res) => {
    const city_id = await db.location.querryCityById(req.params.id);
        res.send(city_id);
});

app.post('/create-region', async (req, res) => {
    const new_region = await db.location.createRegion(req.body);
    if (new_region == false){
        res.status(500).send({message: 'couldnt create region'})
    } else {
        res.status(201).send({message: 'Region Created'})
    }
});

app.post('/create-country', async (req, res) => {
    const new_country = await db.location.createCountry(req.body);
    if (new_country == false){
        res.status(500).send({message: 'couldnt create country'})
    } else {
        res.status(201).send({message: 'Country Created'})
    }
});
app.post('/create-city', async (req, res) => {
    const new_city = await db.location.createCity(req.body);
    if (new_city == false){
        res.status(500).send({message: 'couldnt create city'})
    } else {
        res.status(201).send({message: 'City Created'})
    }
});



//company routs

app.get('/company', async (req, res) => {
    const company = await db.company.querryAll();
        res.send(company);
});

app.get('/company/:Id', async (req, res) => {
    const company = await db.company.querryById(req.params.Id);
    res.send(company)
});

app.post('/create-company', async (req, res) => {
    const new_company = await db.company.createCompany(req.body);
    if (new_company == false){
        res.status(500).send({message: 'couldnt create Company'})
    } else {
        res.status(201).send({message: 'Company Created'})
    }
});


// Contacts routs 

app.get('/contact', async (req, res) => {
    const contact = await db.contact.querryAll();
        res.send(contact);
});

app.get('/contact/:first_name', async (req, res) => {
    const contact = await db.contact.querryByName(req.params.first_name);
        res.send(contact);
});

app.get('/contact/lastname/:last_name', async (req, res) => {
    const contact = await db.contact.querryByLast(req.params.last_name);
        res.send(contact);
});

app.get('/contact/company/:company_id', async (req, res) => {
    const contact = await db.contact.querryByCompany(req.params.company_id);
        res.send(contact);
});

app.get('/contact/region/:region_id', async (req, res) => {
    const contact = await db.contact.querryByRegion(req.params.region_id);
        res.send(contact);
});


app.get('/contact/country/:country_id', async (req, res) => {
    const contact = await db.contact.querryByCountry(req.params.country_id);
    res.send(contact);
});

app.get('/contact/city/:city_id', async (req, res) => {
    const contact = await db.contact.querryByCity(req.params.city_id);
        res.send(contact);
});

app.get('/contact/intrest/:intrest', async (req, res) => {
    const contact = await db.contact.querryByInterest(req.params.intrest);
        res.send(contact);
});

app.post('/create-contact', async (req, res) => {
    if (!(req.body.first_name && req.body.last_name && req.body.job_position && req.body.email && req.body.company_id && req.body.region_id && req.body.country_id && req.body.city_id && req.body.contact_address && req.body.intrest)){
        console.log('data format if');
        return res.status(400).send({ error: "Data not formatted properly" });
    }
    console.log(req.body);
    console.log('previo a new contact');
    const newContact = await db.contact.createContact(req.body);
    if (newContact == false){
        res.status(500).send({message: 'couldnt create Contact'})
    } else {
        res.status(201).send({message: 'Contact Created'})
    }
});


//Contact Channel

app.get('/contactChannel', async (req, res) => {
    console.log('entre al get')
    const contactChannel = await db.contactChannel.querryAll();
        res.send(contactChannel);
});

app.get('/contactChannel/:Id', async (req, res) => {
    const contactChannel = await db.contactChannel.querryById(req.params.Id);
    res.send(contactChannel)
});

app.post('/create-contactChannel', async (req, res) => {
    if (!(req.body.contact_id && req.body.contact_channel_type_id && req.body.socials_username && req.body.preferences )){
        return res.status(400).send({ error: "Data not formatted properly" });
    }
    console.log(req.body);
    const newContactChannel = await db.contactChannel.createContact(req.body);
    if (newContactChannel == false){
        res.status(500).send({message: 'couldnt create Contact Channel'})
    } else {
        res.status(201).send({message: 'Contact Channel Created'})
    }
});


app.listen(3000, () => {
    console.log('Listening on port 3000');
});


