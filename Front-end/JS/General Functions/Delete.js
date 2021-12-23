import {getToken} from '../General Functions/getdata.js';

class DeleteElements {
    constructor(element, info, selector) {
        this.element = element;
        this.selector = selector;
        this.info = info;
        this.element.innerHTML = this.companyConstructor();
        this.element.classList.add( 'modal-confirmation');
        this.addeventlisteners();
    }
    companyConstructor() {
        let imgUrl;
        let message;

        //let companyHTML = ''
        switch (this.selector) {
            case ('city'):
                imgUrl = "/Front-end/img/map-marked.svg"
                message = '¿Estas seguro que deseas eliminar la ciudad seleccionada?' ;
            break;
            
            case ('country'):
                imgUrl = "/Front-end/img/map-marked.svg"
                message = `¿Estas seguro que deseas eliminar el pais seleccionada?` ;
            break;

            case ('region'):
                imgUrl = "/Front-end/img/map-marked.svg"
                message = '¿Estas seguro que deseas eliminar la region seleccionada?' ;
            break;

            case ('company'):
                imgUrl = "/Front-end/img/building-solid.svg"
                message = '¿Estas seguro que deseas eliminar la compañia seleccionada?' ;
            break;

            case ('user'):
                imgUrl = "/Front-end/img/user-solid.svg"
                message = '¿Estas seguro que deseas eliminar el usuario seleccionada?' ;
            break;

            case ('contact'):
                imgUrl = "/Front-end/img/user-solid.svg"
                message = '¿Estas seguro que deseas eliminar el contacto seleccionado?' ;
            break;
            case ('contacts'):
                imgUrl = "/Front-end/img/user-solid.svg"
                message = '¿Estas seguro que deseas eliminar los usuarios seleccionados?' ;
            break;
        }
        console.log(message);
        return(`
        <div class="confirmation">
            <div class='CardClass'>
            <img src="${imgUrl}" class="popup-img"/>
            <p>${message}</p>
            <div class="btn-grp container">
                <button class="btn btn-secondary" id="modal-cancel-btn">Cancelar</button>
                <button class="btn btn-danger" id="modal-delete-location-btn">Eliminar</button>
            </div>
            </div>
        </div>
        `)
    }

    addeventlisteners() {

        let token = getToken();
        var ver = token.substring(0, token.length - 1);

        document.getElementById('modal-cancel-btn').addEventListener('click', () => {
            window.location.reload();
        })
        console.log(document.getElementById('modal-delete-location-btn'));
        document.getElementById('modal-delete-location-btn').addEventListener('click', async () => {
            let endpoint;
            switch (this.selector) {
                case 'region':
                    endpoint = `http://localhost:3000/delete-region/${this.info.id}`;
                    break;
                    
                    case 'country': 
                    endpoint = `http://localhost:3000/delete-country/${this.info.id}`;
                    break;
                    
                    case 'city':
                    endpoint= `http://localhost:3000/delete-city/${this.info.id}`;
                    break;
                case 'contact':
                    endpoint = `http://localhost:3000/delete-contact/${this.info.id}`;
                    break;
                //case 'contacts':
                    //endpoint = `http://localhost:3000/delete-contact/${this.info.id}`;
                    //body = this.meta.contactIds;
                    //body = JSON.stringify({contact_ids: body});
                    //break;
                case 'user':
                    endpoint = `http://localhost:3000/delete-user/${this.info.id}`;
                    break;
                case 'company':
                    endpoint = `http://localhost:3000/delete-company/${this.info.id}`;
                    break;
            }
            try {
                console.log(endpoint);
                let response = await fetch(endpoint, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${ver}`
                    },
                    method: 'DELETE'
                });

                console.log(response)

            } catch (error) {
                console.log(error)
            }
            window.location.reload();
        })
    }
}
export {DeleteElements}