import {getToken} from './getdata.js';
import { UserList } from './usersList.js';
import {AddNewUser} from './addUser.js';
console.log('estoy en users')
let token = getToken();
document.getElementById('contactsBt').addEventListener('click', () =>{
    window.location.href = '/Front-end/index.html';
});
if (token == null) {
    window.location.href = '/Front-end/HTML/login.html';
}else{
    var ver = token.substring(0, token.length - 1);
}

async function getUsers() {
    let url = 'http://localhost:3000/user';
    try {
        let options = {
            type: 'GET',
            headers: {
                "Authorization": `Bearer ${ver}`,
                'Content-Type': 'application/json'
            },
        };
        const response = await fetch(url, options);
        const info = await response.json();
        console.log(info);
        const user = new UserList (document.getElementById('users'), info, null, null);
    } catch (error) {
        console.log(error);
    }
}
getUsers();

document.getElementById('addUser').addEventListener('click', () =>{
    const newUser = new AddNewUser (document.getElementById('modal'), 'add-user', null)
})