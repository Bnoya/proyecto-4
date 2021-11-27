import {getToken} from './getdata.js';


let token = getToken();
document.getElementById('contactsBt').addEventListener('click', () =>{
    window.location.href = '/Front-end/index.html';
});
if (token == null) {
    window.location.href = '/Front-end/HTML/login.html';
}else{
    var ver = token.substring(0, token.length - 1);
}

document.getElementById('create-user').addEventListener('click', async ()=> {
    let name = document.getElementById('user_name').value;
    let last = document.getElementById('last_name').value;    
    let email = document.getElementById('email').value;
    let user = document.getElementById('username').value;
    let password = document.getElementById('password').value;
    let check_password = document.getElementById('check_password').value;
    if (name == '' || last == '' || email == '' || user == ''|| password == '' || check_password == '' ) {
        alert("Fill all the info");
    }else if (check_password != password) {
        alert("Las Contraseñas no coinciden");
    }else{
        let create_company = 'http://localhost:3000/create-user';
            try {
                const data = {
                    "first_name": name,
                    "last_name": last,
                    "pass": password,
                    "username": user,
                    "Email":email
                }
                console.log(data)
                let options_create = {
                    headers: {
                        'Authorization': `Bearer ${ver}`,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data),
                    method: 'POST'
                };
                console.log(options_create);
        
                const response= await fetch(create_company, options_create);
                console.log(response)
                const info = await response.json();
                if (info !== null || info !== undefined) {
                    alert('Usuario creado Exitosamente')
                    location.reload();
                }
                console.log(info)
            } catch (error) {
                console.log('could not fetch')
            }
    }
});

