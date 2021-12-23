import { AddNewUser } from './addUser.js';
import {getToken} from '../General Functions/getdata.js';
import { DeleteElements } from '../General Functions/Delete.js';
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
        let rToken = getToken();
        
        for (let i = 0; i < this.Alternatives.length; i++) {
            let user = this.Alternatives[i]
        document.getElementById(`edit-user-${user.id}`).addEventListener('click', () => {
            console.log(`edit user ${user.id}`);
            const newUser = new AddNewUser (document.getElementById('modal'), 'edit-user', user);
        });
        document.getElementById(`delete-user-${user.id}`).addEventListener('click', async () => {
            console.log(`delete user ${user.id}`);
            const deleteUser = new DeleteElements (document.getElementById('modal-2'), user,'user', )
        })
    }
    };
}
export{UserList}