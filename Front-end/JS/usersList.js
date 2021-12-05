import { AddNewUser } from './addUser.js';
import {getToken} from './getdata.js';

class UserList {
    constructor(element, Alternatives, parent ,locationType) {
        this.element = element;
        this.Alternatives = Alternatives
        console.log(this.Alternatives)
        //this.parent = parent
        //this.locationType = locationType;
        this.element.classList.add('modal');
        this.element.innerHTML = this.innerHTML();
        this.addeventlisteners();
    }
    innerHTML() {

        let userHTML =''
        for (let i = 0; i < this.Alternatives.length; i++) {
            let user = this.Alternatives[i]
            userHTML = userHTML + 
        `
        <div class='user-row'>
            <div class='user'>
                <h3>${user.username}</h3>
            </div>
            <div class='name'>
                <h4> ${user.first_name}</h4>
            </div>
            <div class='lastName'>
                <h4> ${user.last_name}</h4>
            </div>
            <div class='email'>
                <h4>${user.email}</h4>
            </div>
            <div class="edit-button">
                <div id="edit-user-${user.id}" class="icon"><i class="fas fa-edit" ></i></div>
                <div id="delete-user-${user.id}" class="icon" ><i class="fas fa-trash-alt"></i></div>
            </div>
        </div>
        `
        }
        return(userHTML);
    }
    addeventlisteners(){
        for (let i = 0; i < this.Alternatives.length; i++) {
            let user = this.Alternatives[i]
        document.getElementById(`edit-user-${user.id}`).addEventListener('click', () => {
            console.log(`edit user ${user.id}`);
            const newUser = new AddNewUser (document.getElementById('modal'), 'edit-user', user);
        });
        document.getElementById(`delete-user-${user.id}`).addEventListener('click', async () => {
            console.log(`delete user ${user.id}`);
            let rToken = getToken();
            let ver = rToken.substring(0, rToken.length - 1);
            try {
                let options_delete = {
                    headers: {
                        'Authorization': `Bearer ${ver}`,
                        'Content-Type': 'application/json'
                    },
                    method: 'DELETE'
                };
                console.log('entre al try')
                let url = `http://localhost:3000/delete-user/${user.id}`;
                console.log(options_delete)
                const response= await fetch(url, options_delete);
                const info = await response.json();
                console.log(info)
                if (info !== null || info !== undefined) {
                    location.reload();
                }
            } catch (error) {
                console.log('Could Not Delete')
            }
        })
    }
    };
}
export{UserList}