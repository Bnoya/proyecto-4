import {getToken} from '../General Functions/getdata.js';

class AddChannel {
    constructor(element, infoChannel, count, select, contact) {
        this.element = element;
        this.channel = infoChannel;
        this.count = count;
        this.select = select;
        this.contact = contact;
        console.log(this.contact);
        this.element.innerHTML = this.channelConstructor()
        this.addEventListener();
        }
        
    channelConstructor() {


        let contactHTML = '';

        switch (this.select) {
            case 'create':
                contactHTML= contactHTML + `
                <div class='container' id='create'>
                <div class="contactCont"> 
                <label for="contact">Canal de Contacto: </label>
                <select name="contact" id="contChannel-create-${this.count}">
                <option value='not'>Seleccione una...</option>
                `
                for (let i = 0; i < this.channel.length; i++) {
                    let channel = this.channel[i];
                    contactHTML = contactHTML + `
                    <option value="${channel.id}"> ${channel.channel} </option>
                    `
                }
                
                contactHTML = contactHTML + `
                </select>
                </div>
                <div class="userAccount">
                <label for="account">Cuenta del Usuario: </label>
                <input type="text" name="account" id="account-create-${this.count}" placeholder="@ejemplo">
                </div>
                <div class="preffCont">
                <label for="preff">Preferencias: </label>
                <select name="preff" id="preff-create-${this.count}">
                <option value='0'>Seleccionar una...</option>
                <option value='1'>Canal Favorito <i class="fas fa-heart"></i> </option>
                <option value='2'>No Molestar <i class="far fa-times-circle"></i> </option>
                <option value='3'>Solo Emergencias <i class="fas fa-exclamation-triangle"></i> </option>
                </select>
                </div>
                <div class='delete'>
                <p class="delete-channel" id="delete-channel-${this.count}"><img src="./img/delete-red-solid.svg" alt=""></p>
                </div>
                </div>
                `
            break;

            case 'edit':
                contactHTML= contactHTML + `
                <div class='container' id ='edit'>
                <div class="contactCont"> 
                <label for="contact">Canal de Contacto: </label>
                <select name="contact" id="contChannel-edit-${this.count}">
                <option value='not'>Seleccione una...</option>
                `
                for (let i = 0; i < this.channel.length; i++) {
                    let channel = this.channel[i];
                    contactHTML = contactHTML + `
                    <option value="${channel.id}"> ${channel.channel} </option>
                    `
                }
                
                contactHTML = contactHTML + `
                </select>
                </div>
                <div class="userAccount">
                <label for="account">Cuenta del Usuario: </label>
                <input type="text" name="account" id="account-edit-${this.count}" placeholder="@ejemplo">
                </div>
                <div class="preffCont">
                <label for="preff">Preferencias: </label>
                <select name="preff" id="preff-edit-${this.count}">
                <option value='0'>Seleccionar una...</option>
                <option value='1'>Canal Favorito <i class="fas fa-heart"></i> </option>
                <option value='2'>No Molestar <i class="far fa-times-circle"></i> </option>
                <option value='3'>Solo Emergencias <i class="fas fa-exclamation-triangle"></i> </option>
                </select>
                </div>
                <div class='delete'>
                <p class="delete-channel" id="delete-channel-${this.count}"><img src="./img/delete-red-solid.svg" alt=""></p>
                </div>
                </div>
                `
            break;
        }
        return (contactHTML);
    }
    addEventListener() {

        switch (this.select) {
            case 'create':
                document.getElementById(`delete-channel-${this.count}`).addEventListener('click', () =>{
                    let channel_delete = document.getElementById(`delete-row-${this.count}`);
                    console.log('entre a borrar')
                    channel_delete.parentElement.removeChild(channel_delete);
                    
                });
            break;
        
            case 'edit':
                document.getElementById(`delete-channel-${this.count}`).addEventListener('click', async () =>{
                    let channel_delete = document.getElementById(`delete-row-${this.count}`);
                    //console.log('entre a borrar')
                    channel_delete.parentElement.removeChild(channel_delete);
                    let rToken = getToken();
                    let ver = rToken.substring(0, rToken.length - 1);
                    let url = `http://localhost:3000/delete-channel/${this.contact}`;
                    try {
                        let response = await fetch(url , {
                            headers: {
                                'Content-Type': 'application/json',
                                'Authorization': `Bearer ${ver}`
                            },
                            method: 'DELETE'
                        });
                        console.log(response);
                    }catch (err){
                        console.log(err);
                    }
                });
            break;
        }

        
    }
}
export {AddChannel}