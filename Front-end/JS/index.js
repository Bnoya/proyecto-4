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

        console.log(info);
        
        createRows(info);
        
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











