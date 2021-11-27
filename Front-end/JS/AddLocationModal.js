import {getToken} from './getdata.js';

class AddLocationModal {
    constructor(element, parentId, parentAlternatives, locationType) {
        console.log(element);
        this.locationType = locationType;
        this.parentId = parentId;
        this.parentAlternatives = parentAlternatives;
        this.element = element;
        this.element.classList.add('modal');
        this.element.innerHTML = this.innerHTML();
        this.addeventlisteners();
    }

    innerHTML() {
        let heading;
        let inputs;
        switch (this.locationType) {
            case 'region':
                heading = 'Crear Región';
                inputs = `
                    <div class="region" >
                    <label for="region-name-input">Nombre de la región</label>
                    <input type="text" id="region-name-input" />
                    </div>
                `;
                break;
                
            case 'country':
                heading = 'Crear País';
                inputs = `
                <div class="select-region">
                <label for="parent-country">Región a la que pertenece</label>
                <select name="countries" id="parent-country">
                `
                for (let i = 0; i < this.parentAlternatives.length; i++) {
                    const region = this.parentAlternatives[i];
                    inputs += `
                        <option value="${region.id}" ${(region.id == this.parentId) ? 'selected="selected"' : ''}>${region.region_name}</option>          
                        `;
                };
                inputs += `</select> </div>`;
                inputs += `
                    <div class ="Country">
                    <label for="country-name">Nombre del país</label>
                    <input type="text" id="country-name-input"/>
                    </div>
                `
                break;
            case 'city':
                heading = 'Crear Ciudad';
                inputs = `
                <div class="select-country">
                <label for="parent-country">Pais a la que pertenece</label>
                <select name="countries" id="parent-country">
                `
                for (let i = 0; i < this.parentAlternatives.length; i++) {
                    const region = this.parentAlternatives[i];
                    inputs += `
                        <option value="${region.id}" ${(region.id == this.parentId) ? 'selected="selected"' : ''}>${region.country_name}</option>          
                        `;
                };
                inputs += `</select> </div>`;
                inputs += `
                    <div class ="Country">
                    <label for="city-name">Nombre de la ciudad</label>
                    <input type="text" id="city-name-input" name="city-name"/>
                    </div>
                `

                break;
            case 'edit-region':
                heading = 'Editar region';
                inputs = `
                    <div class="edit-region">
                    <div class="oldName">
                    <label>Nombre actual: </label>
                    <label>${this.parentId.region_name}</label>
                    </div>
                    <div class="editRegion">
                    <label for="region-name-input">Nuevo nombre de la región</label>
                    <input type="text" id="region-name-input" />
                    </div>
                    </div>
                `
                
                break;
            case 'edit-country':
                heading = 'Editar País';
                inputs = `
                <div class="select-region">
                <label for="parent-country">Región a la que pertenece</label>
                <select name="countries" id="parent-country">
                `
                for (let i = 0; i < this.parentAlternatives.length; i++) {
                    const region = this.parentAlternatives[i];
                    inputs += `
                        <option value="${region.id}" ${(region.id == this.parentId) ? 'selected="selected"' : ''}>${region.region_name}</option>          
                        `;
                };
                inputs += `</select> </div>`;
                inputs += `
                    <div class ="Country">
                    <label for="country-name">Nombre del país</label>
                    <input type="text" id="country-name-input"/>
                    </div>
                `
                break;
            case 'edit-city':
                heading = 'Editar Ciudad';
                inputs= `
                <div class ='edit-region'>
                <div class='oldName'>
                <label for="parent-country">Pais a la que pertenece</label>
                <label>${this.parentId.country_name}</label>
                </div>
                <div class='editRegion'>
                <label for="old-name">Nombre Actual: </label>
                <label>${this.parentAlternatives.city_name}</label>
                </div>
                <div class="editRegion">
                <label for="city-name-input">Nuevo nombre de la ciudad</label>
                <input type="text" id="city-name-input" />
                </div>
                </div>
                `
                console.log(this.parentId);
                break;
            case 'delete-region':
                heading = 'Eliminar region';
                inputs = `
                    <div class="edit-region">
                    <div class="oldName">
                    <label>Nombre actual: </label>
                    <label>${this.parentId.region_name}</label>
                    </div>
                    <div class="editRegion">
                    <p>Eliminar una region requiere primero eliminar o modificar las ciudades, los paises, los contactos y las companias dependientes de la misma</p>
                    </div>
                    </div>
                `
            break;
            case 'delete-country':
                heading = 'Eliminar Pais';
                inputs = `
                    <div class="edit-region">
                    <div class="oldName">
                    <label>Nombre actual: </label>
                    <label>${this.parentId.country_name}</label>
                    </div>
                    <div class="editRegion">
                    <p>Eliminar una region requiere primero eliminar o modificar las ciudades, los contactos y las companias dependientes del mismo</p>
                    </div>
                    </div>
                `
            break;
            case 'delete-city':
                heading = 'Eliminar Ciudad';
                inputs = `
                    <div class="edit-region">
                    <div class="oldName">
                    <label>Nombre actual: </label>
                    <label>${this.parentAlternatives.city_name}</label>
                    </div>
                    <div class="editRegion">
                    <p>Eliminar una region requiere primero eliminar o modificar los contactos y las companias dependientes de la misma</p>
                    </div>
                    </div>
                `
            break;
            default:
                heading = 'Location'
                break;
        }
        return(`
        
        <div class="container modal-content">
            <h2>${heading}</h2>
            <div class="modal-form container">
                <p id="modal-error"></p>
                ${inputs}
            </div>
            <div class="btn-grp">
                <button class="btn btn-primary" id="modal-create-region-btn">Aceptar</button>
                <button class="btn btn-danger" id="modal-cancel-btn">Cancelar</button>
            </div>
        </div>
        `)
    }

    addeventlisteners(id) {
        //data
        let rToken = getToken();
        let create_region = 'http://localhost:3000/create-region';
        let create_country = 'http://localhost:3000/create-country';
        let create_city = 'http://localhost:3000/create-city';
        let edit_region = 'http://localhost:3000/edit-region';
        let edit_country = 'http://localhost:3000/edit-country';
        let edit_city = 'http://localhost:3000/edit-city';
        let delete_region = `http://localhost:3000/delete-region/${id}`;
        let delete_country = `http://localhost:3000/delete-country/${id}`;
        let delete_city = `http://localhost:3000/delete-city/${id}`;

        let ver = rToken.substring(0, rToken.length - 1);
        document.getElementById('modal-cancel-btn').addEventListener('click', () => {
            location.reload();
        })

        //Create Region

        document.getElementById('modal-create-region-btn').addEventListener('click', async () => {
            switch (this.locationType) {
                case 'region':
                    try {
                        let region = document.getElementById('region-name-input').value;
                        if (region !== null || region !== undefined || region !== '') {
                            const data = {
                                'region_name': region,
                            }
                            let options_create = {
                                headers: {
                                    'Authorization': `Bearer ${ver}`,
                                    'Content-Type': 'application/json'
                                },
                                body: JSON.stringify(data),
                                method: 'POST'
                            };
                            const response= await fetch(create_region, options_create);
                            const info = await response.json();
                            if (info !== null || info !== undefined) {
                                location.reload();
                            }
                            console.log(info)
                        }
                    } catch (error) {
                        console.log('could not fetch')
                    }

                break;
                case 'country':
                    try {
                        let region = document.getElementById('parent-country').value;
                        let country = document.getElementById('country-name-input').value;
                        const data = {
                            'country_name': country,
                            'redion_id': region
                        }
                        let options_create = {
                            headers: {
                                'Authorization': `Bearer ${ver}`,
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify(data),
                            method: 'POST'
                        };
                        const response= await fetch(create_country, options_create);
                        const info = await response.json();
                        if (info !== null || info !== undefined) {
                            location.reload();
                        }
                        console.log(info)
                    } catch (error) {
                        console.log('could not fetch')
                    }
                
                break;
                case 'city':
                    try {
                        let country = document.getElementById('parent-country').value;
                        let city = document.getElementById('city-name-input').value;
                        const data = {
                            'country_id': country,
                            'city_name': city
                        }
                        let options_create = {
                            headers: {
                                'Authorization': `Bearer ${ver}`,
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify(data),
                            method: 'POST'
                        };
                        const response= await fetch(create_city, options_create);
                        const info = await response.json();
                        if (info !== null || info !== undefined) {
                            location.reload();
                        }
                        console.log(info)
                    } catch (error) {
                        console.log('could not fetch')
                    }
                break;
                case 'edit-region':
                    try {
                        let region = document.getElementById('region-name-input').value;
                        const data = {
                            'region_name': region,
                            'id': this.parentId.id
                        }
                        let options_edit = {
                            headers: {
                                'Authorization': `Bearer ${ver}`,
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify(data),
                            method: 'PUT'
                        };
                        const response= await fetch(edit_region, options_edit);
                        const info = await response.json();
                        if (info !== null || info !== undefined) {
                            location.reload();
                        }
                        console.log(info)
                    } catch (error) {
                        console.log('could not fetch')
                    }
                break;
                case 'edit-country':
                    try {
                        let region = document.getElementById('parent-country').value;
                        let country = document.getElementById('country-name-input').value;
                        const data = {
                            'redion_id': region,
                            'country_name': country,
                            'id': this.parentId.id
                        }
                        let options_edit = {
                            headers: {
                                'Authorization': `Bearer ${ver}`,
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify(data),
                            method: 'PUT'
                        };
                        const response= await fetch(edit_country, options_edit);
                        const info = await response.json();
                        if (info !== null || info !== undefined) {
                            location.reload();
                        }
                        console.log(info)
                    } catch (error) {
                        console.log('could not fetch')
                    }
                break;
                case 'edit-city':
                    try {
                        let city = document.getElementById('city-name-input').value;
                        const data = {
                            'city_name': city,
                            'country_id': this.parentId.id,
                            'id': this.parentAlternatives.id
                        }
                        let options_edit = {
                            headers: {
                                'Authorization': `Bearer ${ver}`,
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify(data),
                            method: 'PUT'
                        };
                        const response= await fetch(edit_city, options_edit);
                        const info = await response.json();
                        if (info !== null || info !== undefined) {
                            location.reload();
                        }
                        console.log(info)
                    } catch (error) {
                        console.log('could not fetch')
                    }
                break;
                case 'delete-region':
                    if (this.parentId == undefined || this.parentId == null) {
                    try {
                        
                        let options_delete = {
                            headers: {
                                'Authorization': `Bearer ${ver}`,
                                'Content-Type': 'application/json'
                            },
                            method: 'DELETE'
                        };
                        const response= await fetch(delete_region, options_delete);
                        const info = await response.json();
                        if (info != null || info != undefined) {
                            location.reload();
                        }
                        console.log(info)
                    } catch (error) {
                        console.log('Could Not Delete')
                    }
                } else {
                    alert('First Delete Countries, Cities, Companies and Contacts related to country');
                }
                break;
                case 'delete-country':
                    if (this.parentId == undefined || this.parentId == null) {
                        try {
                            
                            let options_delete = {
                                headers: {
                                    'Authorization': `Bearer ${ver}`,
                                    'Content-Type': 'application/json'
                                },
                                method: 'DELETE'
                            };
                            const response= await fetch(delete_country, options_delete);
                            const info = await response.json();
                            if (info !== null || info !== undefined) {
                                location.reload();
                            }
                            console.log(info)
                        } catch (error) {
                            console.log('Could Not Delete')
                        }
                    }else {
                        alert('First Delete Cities, Companies and Contacts related to country');
                    }
                break;
                case 'delete-city':
                    try {
                        let options_delete = {
                            headers: {
                                'Authorization': `Bearer ${ver}`,
                                'Content-Type': 'application/json'
                            },
                            method: 'DELETE'
                        };
                        const response= await fetch(delete_city, options_delete);
                        const info = await response.json();
                        console.log(info)
                        if (info !== null || info !== undefined) {
                            //location.reload();
                        }
                    } catch (error) {
                        console.log('Could Not Delete')
                    }
                break;

            }
        })
    }
}


export {AddLocationModal}