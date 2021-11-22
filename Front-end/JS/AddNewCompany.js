class AddNewCompany {
    constructor(element, locationType) {
        this.element = element;
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
                <input type="text" id="company-name-input" />
                </div>
                <div class="phone">
                <label for='company-phone-input'>Telefono de la Empresa: </label>
                <input type="text" id="company-phone-input" />
                </div>
                <div class="location"> 
                <label for='company-city-input'>Ciudad: </label>
                <input type="text" id="company-city-input" />
                </div>
                <div class="address">
                <label for='company-address-input'>Direccion de la Empresa: </label>
                <input type="text" id="company-address-input" />
                </div>
                </div>
                `;
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
            console.log('Cargar Nueva Empresa');
        })
    }
}
export{AddNewCompany}