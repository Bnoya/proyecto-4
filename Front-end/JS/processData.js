


function loadContact() {
    let data = document.getElementById('list');

    
    let contact = {
        id : '1',
        first_name : 'Bruce',
        last_name : 'Wayne',
        job_position : 'Entrepenur',
        email : 'iamnot@batman.com',
        company_id : 'La Liga de la Justicia',
        region_id : 'North America',
        country_id : 'United States',
        city_id : 'Gotham',
        contact_address : 'Wayne Mansion',
        interest : '75'
    };


    let divCont = document.createElement('div').setAttribute('class', 'container');
    let name = document.createElement('div').setAttribute('class', 'items');
    let last = document.createElement('div').setAttribute('class', 'items');
    let job = document.createElement('div').setAttribute('class', 'items');
    let email = document.createElement('div').setAttribute('class', 'items');
    let company = document.createElement('div').setAttribute('class', 'items');
    let region = document.createElement('div').setAttribute('class', 'items');
    let country = document.createElement('div').setAttribute('class', 'items');
    let city = document.createElement('div').setAttribute('class', 'items');
    let address = document.createElement('div').setAttribute('class', 'items');
    let interest = document.createElement('div').setAttribute('class', 'items');


    // texts

    let hname = document.createElement('h6');
    let hlast = document.createElement('p').setAttribute('class', 'text');
    let hjob = document.createElement('p').setAttribute('class', 'text');
    let hemail = document.createElement('p').setAttribute('class', 'text');
    let hcompany = document.createElement('p').setAttribute('class', 'text');
    let hregion = document.createElement('p').setAttribute('class', 'text');
    let hcountry = document.createElement('p').setAttribute('class', 'text');
    let hcity = document.createElement('p').setAttribute('class', 'text');
    let haddress = document.createElement('p').setAttribute('class', 'text');
    let hinterest = document.createElement('p').setAttribute('class', 'text');
// add values
    hname = contact.first_name;
    hlast = contact.last_name;
    hjob = contact.job_position;
    hemail = contact.email;
    hcompany = contact.company_id;
    hregion = contact.region_id;
    hcountry = contact.country_id;
    hcity = contact.city_id;
    haddress = contact.contact_address;
    hinterest = contact.interest;




//append divs

    data.append(divCont);
    data.append(name)
    data.append(last);
    data.append(job);
    data.append(email);
    data.append(company);
    data.append(region);
    data.append(country);
    data.append(city);
    data.append(address);
    data.append(interest);

}


export{loadContact};
