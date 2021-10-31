import{loadContact} from './processData.js';
import {getToken} from './getdata.js';
import {Contact} from './contacts.js';

let token = getToken();
if (token == null) {
    window.location.href = '/Front-end/HTML/login.html';
}

loadContact();



async function getContacts(){
    let list = [];
    let url=`http://localhost:3000/contact`;
    try {
        console.log(token);
        let options = {
            type: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
        };
        const response= await fetch(url, options);
        const info = await response.json();
        console.log(info)
        
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








