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
                    <div class="region">
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
                    <label for="country-name">Nombre de la ciudad</label>
                    <input type="text" id="country-name-input"/>
                    </div>
                `

                break;
            case 'edit-region':
                heading = 'Editar region';
                inputs = `
                    <div class="edit-region">
                    <div class="oldName">
                    <label>Nombre actual: </label>
                    <label>${this.parentId}</label>
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
                <button class="btn btn-primary" id="modal-create-region-btn">Agregar</button>
                <button class="btn btn-danger" id="modal-cancel-btn">Cancelar</button>
            </div>
        </div>
        `)
    }

    addeventlisteners(id) {
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
        
        let options_edit = {
            type: 'PUT',
            headers: {
                'Authorization': `Bearer ${ver}`,
                'Content-Type': 'application/json'
            },
        };
        let options_delete = {
            type: 'DELETE',
            headers: {
                'Authorization': `Bearer ${ver}`,
                'Content-Type': 'application/json'
            },
        };
        document.getElementById('modal-cancel-btn').addEventListener('click', () => {
            location.reload();
        })

        document.getElementById('modal-create-region-btn').addEventListener('click', async () => {
            try {
                let region = document.getElementById('region-name-input').value;
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
                console.log(options_create);
                const response= await fetch(create_region, options_create);
                const info = await response.json();
                if (info.status === 201) {
                    location.reload();
                }
                console.log(info)
            } catch (error) {
                console.log('could not fetch')
            }
        })
    }
}

export {AddLocationModal}