const express = require('express');
const morgan = require('morgan');
const jwt = require('jsonwebtoken');
const { users } = require('./objects/index.js');

const db = require('./objects/index.js');
const app = express();


db.sequelize.sync();

app.use(express.json());
app.use(morgan(':method :url :status :res[content-length] - :response-time ms'));

const SECRET_KEY = 'lifeisgood';

//middelWare:

const authenticateUser = (req, res, next) => {
    const nonSecurePaths = ['/user/login', '/create-user'];
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
            userRoleId: user.user_role_id
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

app.post('/create-user', async (req, res) => {
    if (!(req.body.first_name && req.body.last_name && req.body.user_role && req.body.pass && req.body.username)) {
        return res.status(400).send({ error: "Data not formatted properly" });
    }
    req.body.user_role_id = 2;

    const new_user = await db.users.newUser(req.body);
    if (new_user == false){
        res.status(500).send({message: 'couldnt create user'})
    } else {
        res.status(201).send({message: 'User Created'})
    }
})



//Location Routs

app.get('/regions', async (req, res) => {
    const region = await db.location.querryAllRegions();
        res.send(region);
});
app.get('/country', async (req, res) => {
    const country = await db.location.querryAllCountries();
        res.send(country);
});
app.get('/country/:region', async (req, res) => {
    const countryRedion = await db.location.querryCountryByRegion(req.params.redion_name);
        res.send(countryRedion);
});

app.get('/city', async (req, res) => {
    const city = await db.location.querryAllCities();
        res.send(city);
});
app.get('/city/:country', async (req, res) => {
    const city_country = await db.location.querryCitiesByCountry(req.params.country_id);
        res.send(city_country);
});

app.post('/create-region', async (req, res) => {
    const new_region = await db.location.createRegion(req.body);
    if (new_region == false){
        res.status(500).send({message: 'couldnt create region'})
    } else {
        res.status(201).send({message: 'Region Created'})
    }
})

app.post('/create-country', async (req, res) => {
    const new_country = await db.location.createCountry(req.body);
    if (new_country == false){
        res.status(500).send({message: 'couldnt create country'})
    } else {
        res.status(201).send({message: 'Country Created'})
    }
})
app.post('/create-city', async (req, res) => {
    const new_city = await db.location.createCity(req.body);
    if (new_city == false){
        res.status(500).send({message: 'couldnt create city'})
    } else {
        res.status(201).send({message: 'City Created'})
    }
})




app.listen(3000, () => {
    console.log('Listening on port 3000');
});


