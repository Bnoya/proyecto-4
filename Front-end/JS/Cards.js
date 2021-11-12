import {getToken} from './getdata.js';
import {CreateRows} from './RenderContacts.js';

let token = getToken();
if (token == null) {
    window.location.href = '/Front-end/HTML/login.html';
}else{
    var ver = token.substring(0, token.length - 1);
}

async function createRows(contacts) {
    console.log('entre a funcion')
    for (let i = 0; i < contacts.length; i++) {
                const contactsRender = new CreateRows(document.getElementById('list'), contacts );
            }
        }

//actions logo
//<i class="fas fa-ellipsis-h"></i>



export {createRows}