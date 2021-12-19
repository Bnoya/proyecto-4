import {getToken} from '../General Functions/getdata.js';
import {CreateRows} from './RenderContacts.js';

let token = getToken();
if (token == null) {
    window.location.href = '/Front-end/HTML/login.html';
}else{
    var ver = token.substring(0, token.length - 1);
}

async function createNewRows(contacts, channels) {
    //console.log(contacts);
    //console.log(channels);
    const contactsRender = new CreateRows(document.getElementById('list'), contacts , channels, 'regular');
}

//actions logo
//<i class="fas fa-ellipsis-h"></i>



export {createNewRows}