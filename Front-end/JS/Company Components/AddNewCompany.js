import {getToken} from '../General Functions/getdata.js';

class AddNewCompany {
    constructor(element, Alternatives, parent ,locationType) {
        this.element = element;
        this.Alternatives = Alternatives
        this.parent = parent
        this.locationType = locationType;

        this.element.classList.add('modal');
        this.element.innerHTML = this.innerHTML();
        this.addeventlisteners();
    }
    innerHTML() {
        let heading;
        let inputs;
        switch (this.locationType) {
            case 'add-company':
                heading = 'Añadir Compañia';
                inputs= `
                <div class='add-new-company'>
                <div class="company">
                <label for='company-name-input'>Nombre de la Empresa: </label>
                <input type="text" id="company-name-input" placeholder='Nueva Empresa .SA' />
                </div>
                <div class="phone">
                <label for='company-phone-input'>Telefono de la Empresa: </label>
                <input type="text" id="company-phone-input" placeholder='000-000-0000'/>
                </div>
                <div class="location"> 
                <label for='company-city-input'>Ciudad: </label>
                <Select name="city" id= "city-id">
                `
                for (let i = 0; i < this.Alternatives.length; i++) {
                    const city = this.Alternatives[i];
                    inputs += `
                        <option value="${city.id}"> ${city.city_name} </option>          
                        `;
                };
                inputs +=
                `
                </select>
                </div>
                <div class="address">
                <label for='company-address-input'>Direccion de la Empresa: </label>
                <input type="text" id="company-address-input" placeholder='Direccion de la Empresa' />
                </div>
                </div>
                `;
            break;
            case 'edit-company' :
                console.log(this.Alternatives);
                heading = 'Editar Compañia';

                inputs = `
                <div class='all_data'>
                <div class='oldData'>
                <div class='company'>
                <label for='company-old-name-input'>Nombre actual de la Empresa: </label>
                <label for='company-old-name-input'>${this.Alternatives.company_name}</label>
                </div>
                <div class='phone'>
                <label for='company-old-phone-input'>Telefono actual de la Empresa: </label>
                <label for='company-old-phone-input'>${this.Alternatives.phone}</label>
                </div>
                <div class='location'>
                <label for='company-old-city-input'>Ciudad actual: </label>
                <label for='company-old-city-input'>${this.Alternatives.city_id}</label>
                </div>
                <div class='address'>
                <label for='company-old-address-input'>Direccion actual de la Empresa: </label>
                <label for='company-old-address-input'>${this.Alternatives.company_address} </label>
                </div>
                <div class='edit-new-company'>
                <div class="company">
                <label for='company-name-input'>Nombre de la Empresa: </label>
                <input type="text" id="company-name-input" placeholder='Nueva Empresa .SA' />
                </div>
                <div class="phone">
                <label for='company-phone-input'>Telefono de la Empresa: </label>
                <input type="text" id="company-phone-input" placeholder='000-000-0000'/>
                </div>
                <div class="location"> 
                <label for='company-city-input'>Ciudad: </label>
                <Select name="city" id= "city-id">
                </div>
                </div>
                `
                for (let i = 0; i < this.parent.length; i++) {
                    const city = this.parent[i];
                    inputs += `
                        <option value="${city.id}"> ${city.city_name} </option>          
                        `;
                };
                inputs +=
                `
                </select>
                </div>
                <div class="address">
                <label for='company-address-input'>Direccion de la Empresa: </label>
                <input type="text" id="company-address-input" placeholder='Direccion de la Empresa' />
                </div>
                </div>
                `
            break;

            case 'delete-company':
                alert('Delete Company');
            break;
        }
        return(`
        <div class="modal-content">
            <h2>${heading}</h2>
            <div class="modal-form">
                <p id="modal-error"></p>
                ${inputs}
            </div>
            <div class="btn-grp">
                <button class="btn btn-primary" id="modal-create-company-btn">Aceptar</button>
                <button class="btn btn-danger" id="modal-cancel-btn">Cancelar</button>
            </div>
        </div>
        `)
    }
    addeventlisteners(){
        document.getElementById('modal-cancel-btn').addEventListener('click', () => {
            location.reload();
        });

        document.getElementById('modal-create-company-btn').addEventListener('click', async () =>{
            let city_id = document.getElementById('city-id').value;
            let company_name = document.getElementById('company-name-input').value;
            let company_phone = document.getElementById('company-phone-input').value;
            let company_address = document.getElementById('company-address-input').value;
            
            switch (this.locationType) {
                case 'add-company':
                let rToken = getToken();
                let ver = rToken.substring(0, rToken.length - 1);
                if (city_id == '' || company_name == '' || company_phone == '' || company_address =='' ) {
                    alert('Todos los campos deben estar completos para cargar una nueva compania.');
                }else {
                    let create_company = 'http://localhost:3000/create-company';
                    try {
                        const data = {
                            "city_id": city_id,
                            "company_name": company_name,
                            "company_address": company_address,
                            "phone": company_phone
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
                            location.reload();
                        }
                        console.log(info)
                    } catch (error) {
                        console.log('could not fetch')
                    }
                }
                break;
                case 'edit-company' :
                    let PToken = getToken();
                    let Per = PToken.substring(0, PToken.length - 1);
                    if (city_id == '' || company_name == '' || company_phone == '' || company_address =='' ) {
                        alert('Todos los campos deben estar completos para editar compania.');
                    }else {
                        let create_company = 'http://localhost:3000/edit-company';
                        try {
                            const data = {
                                "city_id": city_id,
                                "company_name": company_name,
                                "company_address": company_address,
                                "phone": company_phone,
                                "id": this.Alternatives.id
                            }
                            let options_create = {
                                headers: {
                                    'Authorization': `Bearer ${Per}`,
                                    'Content-Type': 'application/json'
                                },
                                body: JSON.stringify(data),
                                method: 'PUT'
                            };
                            console.log(options_create);
    
                            const response= await fetch(create_company, options_create);
                            console.log(response)
                            const info = await response.json();
                            if (info != null || info != undefined) {
                                location.reload();
                            }
                            console.log(info)
                        } catch (error) {
                            console.log('could not fetch')
                        }
                    }
                break;
            }
        })
    }
}
export{AddNewCompany}