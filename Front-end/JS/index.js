import {getToken} from './getdata.js';
import {Contact} from './contacts.js';
import {createRows} from './Cards.js';

let token = getToken();

if (token == null) {
    window.location.href = '/Front-end/HTML/login.html';
}else{
    var ver = token.substring(0, token.length - 1);
}


async function getContacts(){
    let url=`http://localhost:3000/contact`;

    
    try {
        let options = {
            type: 'GET',
            headers: {
                'Authorization': `Bearer ${ver}`,
                'Content-Type': 'application/json'
            },
        };
        const response= await fetch(url, options);
        const info = await response.json();

        let full_Data = []
        for (let i = 0; i < info.length; i++) {
            const contact = info[i];
            let companyName = `http://localhost:3000/company/${contact.company_id}`;
            let regionName = `http://localhost:3000/regions/${contact.region_id}`;
            let countryName = `http://localhost:3000/country/id/${contact.country_id}`;

            const response1= await fetch(companyName, options);
            const company = await response1.json();
            const response2= await fetch(regionName, options);
            const region = await response2.json();
            const response3= await fetch(countryName, options);
            const getCountry = await response3.json();

            contact.company_id = company[0].company_name;
            contact.region_id = region[0].region_name;
            contact.country_id = getCountry[0].country_name;
            
            if(contact.interest == null){
                contact.interest = '0';
            }

            full_Data.push(contact)
        }
        console.log(full_Data)
        createRows(full_Data);
    } catch (error) {
        console.log(error);
    }
}

let contact = document.getElementById('contactsBt');
contact.addEventListener('click', () => {
    console.log('toque el boton');
    const contacts = new Contact(document.getElementById('contacts-window'), 1);
});

getContacts();











