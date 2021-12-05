//import { isBuffer } from 'util';
import {getToken} from './getdata.js';

class AddNewUser {
    constructor(element, parentId, info) {
        this.element = element;
        this.parentId = parentId;
        this.info = info;
        console.log(this.info.id);
        console.log(this.parentId);
        this.element.classList.add('window');
        this.element.innerHTML = this.innerHTML();
        this.addeventlisteners();
    }
    innerHTML() {
        let newUser;
        switch (this.parentId) {
            case 'add-user':
                newUser = newUser + `
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
                
                break;
                
                case 'edit-user':
                    newUser = newUser + `
                <div class='edit'>
                <form class="form">
                        <div class="title">
                            <h3>Editar Usuario</h3>
                        </div>
                        <div class="name">
                            <label for="name">Nombre: </label>
                            <label for="name">${this.info.first_name}</label>
                            <input type="text" name="name" id="user_name">
                        </div>
                        <div class="last">
                            <label for="last">Apellido: </label>
                            <label for="last">${this.info.last_name}</label>
                            <input type="text" name="last" id="last_name">
                        </div>
                        <div class="email">
                            <label for="email">Email: </label>
                            <label for="email">${this.info.email}</label>
                            <input type="text" name="email" id="email">
                        </div>
                        <div class="user">
                            <label for="user">Usuario: </label>
                            <label for="user">${this.info.username}</label>
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
                            <button id="edit-user">Editar</button>
                        </div>
                    </form>
                </div>
                `;
                break;
            }
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
        switch (this.parentId) {
            case 'add-user':
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
                        try {
                            let url = 'http://localhost:3000/create-user';
                            const data = {
                                
                                "first_name": name,
                                "last_name": last,
                                "pass": password,
                                "username": user,
                                "Email":email
                            }
                            
                            let options_create = {
                                headers: {
                                    'Authorization': `Bearer ${ver}`,
                                    'Content-Type': 'application/json'
                                },
                                body: JSON.stringify(data),
                                method: 'POST'
                            };
                            
                    
                            const response= await fetch(url, options_create);
                            
                            const info = await response.json();
                            if (info !== null || info !== undefined) {
                                alert('Usuario creado Exitosamente')
                                location.reload();
                            }
                            
                        } catch (error) {
                            console.log('could not fetch')
                        }
                    }
                });
                
                break;
        
            case 'edit-user':
            
                document.getElementById('edit-user').addEventListener('click', async () => {
                    let name = document.getElementById('user_name').value;
                    let last = document.getElementById('last_name').value;    
                    let email = document.getElementById('email').value;
                    let user = document.getElementById('username').value;
                    let password = document.getElementById('password').value;
                    let check_password = document.getElementById('check_password').value;
        
        
                    if (name == '' || last == '' || email == '' || user == ''|| password == '' || check_password == '' ) {
                        //alert("Fill all the info");
                        console.log('error en formato de datos')
                    }else if (check_password != password) {
                        alert("Las Contraseñas no coinciden");
                    }else{
                        let edit_user='http://localhost:3000/edit-user';
                        try {
                        const data = {
                            'id': this.info.id,
                            "first_name": name,
                            "last_name": last,
                            "pass": password,
                            "username": user,
                            "Email":email
                        }
                        let options_edit = {
                            headers: {
                                'Authorization': `Bearer ${ver}`,
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify(data),
                            method: 'PUT'
                        };
                        const response= await fetch(edit_user, options_edit);
                        const info = await response.json();
                        if (info !== null || info !== undefined) {
                            location.reload();
                        }
                        console.log(info)
                    } catch (error) {
                        console.log('could not fetch')
                    }
                    }
                })
                break;
        }


    }
}
export{AddNewUser}