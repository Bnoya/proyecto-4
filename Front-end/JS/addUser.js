import {getToken} from './getdata.js';

class AddNewUser {
    constructor(element) {
        this.element = element;
        this.element.classList.add('window');
        this.element.innerHTML = this.innerHTML();
        this.addeventlisteners();
    }
    innerHTML() {
        let newUser = `
        <div class='create'>
        <form class="form">
                <div class="title">
                    <h3>Crear Usuario</h3>
                </div>
                <div class="name">
                    <label for="name">Nombre: </label>
                    <input type="text" name="name" id="user_name">
                </div>
                <div class="last">
                    <label for="last">Apellido: </label>
                    <input type="text" name="last" id="last_name">
                </div>
                <div class="email">
                    <label for="email">Email: </label>
                    <input type="text" name="email" id="email">
                </div>
                <div class="user">
                    <label for="user">Usuario: </label>
                    <input type="text" name="user" id="username">
                </div>
                <div class="password1">
                    <label for="pass1">Contraseña: </label>
                    <input type="password" name="pass1" id="password">
                </div>
                <div class="password2">
                    <label for="pass2">Repetir Contraseña: </label>
                    <input type="password" name="pass2" id="check_password">
                </div>
                <div class="create">
                    <button id='modal-cancel-btn'>Cancelar</button>
                    <button id="create-user">Crear</button>
                </div>
            </form>
        </div>
        `;
        return(newUser);
    }
    addeventlisteners(){
        document.getElementById('modal-cancel-btn').addEventListener('click', () => {
            location.reload();
        });
        let token = getToken();
        document.getElementById('contactsBt').addEventListener('click', () =>{
            window.location.href = '/Front-end/index.html';
        });
        if (token == null) {
            window.location.href = '/Front-end/HTML/login.html';
        }else{
            var ver = token.substring(0, token.length - 1);

        }
        document.getElementById('create-user').addEventListener('click', async () => {
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
        })
    }
}
export{AddNewUser}