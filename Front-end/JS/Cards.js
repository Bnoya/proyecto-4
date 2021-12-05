import {getToken} from './getdata.js';
import {CreateRows} from './RenderContacts.js';

let token = getToken();
if (token == null) {
    window.location.href = '/Front-end/HTML/login.html';
}else{
    var ver = token.substring(0, token.length - 1);
}

async function createRows(contacts, channels) {
    const contactsRender = new CreateRows(document.getElementById('list'), contacts , channels);
}

//actions logo
//<i class="fas fa-ellipsis-h"></i>



export {createRows}