import{loadContact} from './processData.js';
import {getToken} from './getdata.js';
import {Contact} from './contacts.js';

let token = getToken();
if (token == null) {
    window.location.href = '/Front-end/HTML/login.html';
}
let NToken= JSON.stringify(token);
loadContact();



async function getContacts(){
    let list = [];
    let url=`http://localhost:3000/contact`;
    try {
        console.log(token);
        let options = {
            type: 'GET',
            headers: {
                'Authorization': 'Bearer ' + NToken,
                'Content-Type': 'application/json'
            },
        };
        const response= await fetch(url, options);
        const info = await response.json();
        
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








