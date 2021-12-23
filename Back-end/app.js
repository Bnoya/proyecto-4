const express = require('express');
const morgan = require('morgan');
const jwt = require('jsonwebtoken');
const { users } = require('./objects/index.js');
const cors = require('cors');
const db = require('./objects/index.js');
const app = express();
const fileUpload = require('express-fileupload');

db.sequelize.sync();

app.use(cors());
app.use(express.json());
app.use(morgan(':method :url :status :res[content-length] - :response-time ms'));
const SECRET_KEY = 'lifeisgood';

// enable files upload
app.use(fileUpload({
    createParentPath: true
}));
app.use('/public',express.static('public'))



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
    const SecurePaths = ['/create-user', '/user', '/delete-user/:id', ];
    if (SecurePaths.includes(req.path)){
        const authHead = req.headers['authorization'];
        if (authHead) {
            if (req.user.userRole != 1) {
                res.status(404).send({message:'unAuthorized user'});
            } else {
                next();
            }
        }
    } else {
        return next();
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
            userRole: user.user_role,
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
app.get('/user', async (req, res) => {
    const users = await db.users.querryAll();
        res.send(users);
});
app.get('/usernames', async (req, res) => {
    const users = await db.users.querryAllUsernames();
        res.send(users);
});

app.put('/edit-user', async (req, res)=> {
    console.log(req.body);
    const editUser = await db.users.updateUser(req.body);
    if (editUser == false) {
        res.status(500).send({message: 'Couldnt update User'})
    } else{
        res.status(201).send({message: 'User Updated'})
    }
})
app.delete('/delete-user/:id', async (req, res) => {
    const deleteUsers = await db.users.deleteUser(req.params.id);
    if (deleteUsers == 'users Not Deleted'){
        res.status(500).send({message: 'users Not Deleted'})
    } else {
        res.status(201).send({message: 'users Deleted'})
    }
})

//Location Routs



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
app.delete('/delete-region/:id', async (req, res) => {
    const deleteRegion = await db.location.deleteRegion(req.params.id);
    if (deleteRegion == 'Region Not Deleted'){
        res.status(500).send({message: 'Region Not Deleted'})
    } else {
        res.status(201).send({message: 'Region Deleted'})
    }
})
app.put('/edit-region', async (req, res)=> {
    const editRegion = await db.location.updateRegion(req.body);
    if (editRegion == false) {
        res.status(500).send({message: 'Couldnt update Region'})
    } else{
        res.status(201).send({message: 'Region Updated'})
    }
})

app.post('/create-country', async (req, res) => {
    const new_country = await db.location.createCountry(req.body);
    if (new_country == false){
        res.status(500).send({message: 'couldnt create country'})
    } else {
        res.status(201).send({message: 'Country Created'})
    }
});
app.delete('/delete-country/:id', async (req, res) => {
    const deleteCountry = await db.location.deleteCountry(req.params.id);
    if (deleteCountry == false){
        res.status(500).send({message: 'couldnt delete Country'})
    } else {
        res.status(201).send({message: 'Country Deleted'})
    }
});
app.put('/edit-country', async (req, res)=> {
    const editCountry = await db.location.updateCountry(req.body);
    if (editCountry == false) {
        res.status(500).send({message: 'Couldnt update Country'})
    } else{
        res.status(201).send({message: 'Country Updated'})
    }
})

app.post('/create-city', async (req, res) => {
    const new_city = await db.location.createCity(req.body);
    if (new_city == false){
        res.status(500).send({message: 'couldnt create city'})
    } else {
        res.status(201).send({message: 'City Created'})
    }
});
app.delete('/delete-city/:id', async (req, res) => {
    const deleteCity = await db.location.deleteCity(req.params.id);
    if (deleteCity == false){
        res.status(500).send({message: 'couldnt delete City'})
    } else {
        res.status(201).send({message: 'City Deleted'})
    }
})
app.put('/edit-city', async (req, res)=> {
    const editCity = await db.location.updateCity(req.body);
    if (editCity == false) {
        res.status(500).send({message: 'Couldnt update city'})
    } else{
        res.status(201).send({message: 'City Updated'})
    }
})

//Autocomplete Locations 
app.get('/city-autocomplete/:contact', async (req, res) => {
    const city = await db.location.CityAutoComplete(req.params.contact);
        res.send(city);
});
app.get('/country-autocomplete/:contact', async (req, res) => {
    const country = await db.location.CountryAutoComplete(req.params.contact);
        res.send(country);
});
app.get('/region-autocomplete/:contact', async (req, res) => {
    const region = await db.location.RegionAutoComplete(req.params.contact);
        res.send(region);
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
app.delete('/delete-company/:id', async (req, res) => {
    const deleteCompany = await db.company.deleteCompany(req.params.id);
    console.log(deleteCompany);
    if (deleteCompany == false){
        res.status(500).send({message: 'couldnt delete Company'})
    } else {
        res.status(201).send({message: 'Company Deleted'})
    }
});
app.put('/edit-company', async (req, res)=> {
    const editCompany = await db.company.updateCompany(req.body);
    if (editCompany == false) {
        res.status(500).send({message: 'Couldnt update Company'})
    } else{
        res.status(201).send({message: 'Company Updated'})
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
app.get('/contact/intrest/:intrest', async (req, res) => {
    const contact = await db.contact.querryByInterest(req.params.intrest);
        res.send(contact);
});

app.post('/create-contact', async (req, res) => {
    if (!(req.body.first_name && req.body.last_name && req.body.job_position && req.body.email && req.body.company_id && req.body.region_id && req.body.country_id && req.body.city_id && req.body.contact_address && req.body.interest)){
        console.log('data format if');
        return res.status(400).send({ error: "Data not formatted properly" });
    }
    const newContact = await db.contact.createContact(req.body);
    if (newContact == false){
        res.status(500).send({message: 'couldnt create Contact'});
    } else {
        res.status(201).send(newContact);
    }
});

app.delete('/delete-contact/:id', async (req, res) => {
    const deleteContact = await db.contact.deleteContact(req.params.id);
    if (deleteContact == false){
        res.status(500).send({message: 'couldnt delete Contact'})
    } else {
        res.status(201).send({message: 'Contact Deleted'})
    }
});

app.delete('/delete-contacts', async (req, res) => {

    let contactIds = req.body.contact_ids;
    const deleteContact = await db.contact.deleteContacts(contactIds);
    if (deleteContact == false){
        res.status(500).send({message: 'couldnt delete Contact'})
    } else {
        res.status(201).send({message: 'Contact Deleted'})
    }
});

app.put('/edit-contact', async (req, res)=> {
    const editContact = await db.contact.updateContact(req.body);
    if (editContact == false) {
        res.status(500).send({message: 'Couldnt update Contact'})
    } else{
        res.status(201).send({message: 'Contact Updated'})
    }
});

app.get('/contact-autocomplete-one/:contacts', async (req, res) => {
    const contact = await db.contact.ContactAutoCompleteOne(req.params.contacts);
        res.send(contact);
});
app.get('/contact-autocomplete-two/:contacts', async (req, res) => {
    const contact = await db.contact.ContactAutoCompleteTwo(req.params.contacts);
        res.send(contact);
});
app.get('/contact-autocomplete-three/:contacts', async (req, res) => {
    const contact = await db.contact.ContactAutoCompleteThree(req.params.contacts);
        res.send(contact);
});
app.get('/contact-autocomplete-four/:contacts', async (req, res) => {
    const contact = await db.contact.ContactAutoCompleteFour(req.params.contacts);
        res.send(contact);
});
app.get('/contact-autocomplete-five/:contacts', async (req, res) => {
    const contact = await db.contact.ContactAutoCompleteFive(req.params.contacts);
        res.send(contact);
});

app.get('/contact-search-one/:contacts', async (req, res) => {
    const contact = await db.contact.ContactSearchOne(req.params.contacts);
        res.send(contact);
});
app.get('/contact-search-two/:contacts', async (req, res) => {
    const contact = await db.contact.ContactSearchTwo(req.params.contacts);
        res.send(contact);
});
app.get('/contact-search-three/:contacts', async (req, res) => {
    const contact = await db.contact.ContactSearchThree(req.params.contacts);
        res.send(contact);
});
app.get('/contact-search-four/:contacts', async (req, res) => {
    const contact = await db.contact.ContactSearchFour(req.params.contacts);
        res.send(contact);
});
app.get('/contact-search-five/:contacts', async (req, res) => {
    const contact = await db.contact.ContactSearchFive(req.params.contacts);
        res.send(contact);
});
app.get('/contact-search-six/:contacts', async (req, res) => {
    const contact = await db.contact.ContactSearch(req.params.contacts);
        res.send(contact);
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
    const newContactChannel = await db.contactChannel.createContactChannel(req.body);
    if (newContactChannel == false){
        res.status(500).send({message: 'couldnt create Contact Channel'})
    } else {
        res.status(201).send({message: 'Contact Channel Created'})
    }
});

//app.delete('/delete-ContactChannel/:id', async (req, res) => {
//    const deleteContactChannel = await db.contactChannel.deleteCompany(req.params.id);
//    if (deleteContactChannel == false){
//        res.status(500).send({message: 'couldnt delete Contact Channel'})
//    } else {
//        res.status(201).send({message: 'Contact Channel Deleted'})
//    }
//});
app.put('/edit-ContactChannel', async (req, res)=> {
    const editContactChannel = await db.contactChannel.updateContactChannel(req.body);
    if (editContactChannel == false) {
        res.status(500).send({message: 'Couldnt update Contact Channel'})
    } else{
        res.status(201).send({message: 'Contact Channel Updated'})
    }
});


//Channel Type

app.get('/Channeltype', async (req, res) => {
    const channelType = await db.channelType.querryAll();
        res.send(channelType);
});

app.get('/Channeltype/:id', async (req, res) => {
    const ChannelType = await db.channelType.querryById(req.params.id);
    res.send(ChannelType);
});


//img Upload

app.post('/upload-avatar/:contactId', async (req, res) => {
    try {
        const contactId = req.params.contactId;

        if(!req.files) {
            res.send({
                status: false,
                message: 'No file uploaded'
            });
        } else {
            //Use the name of the input field (i.e. "avatar") to retrieve the uploaded file
            let avatar = req.files.avatar;

            //Use the mv() method to place the file in upload directory (i.e. "uploads")
            avatar.mv('./public/avatars/' + `contact-${contactId}.` + avatar.name.split('.')[1]);

            //send response
            res.send({
                status: 200,
                message: 'File is uploaded',
                data: {
                    name: avatar.name,
                    mimetype: avatar.mimetype,
                    size: avatar.size
                }
            });
        }
    } catch (err) {
        console.log(err)
        res.status(500).send(err);
    }
});

app.listen(3000, () => {
    console.log('Listening on port 3000');
});


