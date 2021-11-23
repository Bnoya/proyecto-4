import {AddNewCompany} from './AddNewCompany.js'
class Company {
    constructor(element, info, city) {

        this.element = element
        this.city = city
        this.element.innerHTML = this.companyConstructor(info)
        this.element.innerHTML = this.element.innerHTML +
        `
        <div class="company container">
            <div class = "add-company">
            <button id="add-company" class="button">Agregar Compañia</button>
            </div>
        </div>
        `
        this.element.classList.add('Companies', 'container');
        this.addEventListener(info);
        }

    companyConstructor(info) {
        let companyHTML = ''
        for (let i = 0; i < info.length; i++) {
            let Ninfo = info[i]
            companyHTML = companyHTML + `
                <div class='company row'>
                    <div class='name'>
                        <h3>${Ninfo.company_name}</h3>
                    </div>
                    <div class='city'>
                        <h4> ${Ninfo.city_id}</h4>
                    </div>
                    <div class='address'>
                        <h4> ${Ninfo.company_address}</h4>
                    </div>
                    <div class='phone'>
                        <h4>${Ninfo.phone}</h4>
                    </div>
                    <div class="edit-button">
                        <div id="edit-region-${Ninfo.id}" class="icon"><i class="fas fa-edit" ></i></div>
                        <div id="delete-region-${Ninfo.id}" class="icon" ><i class="fas fa-trash-alt"></i></div>
                    </div>
                </div>
                `
        }
            return(companyHTML)
        
    }
    addEventListener(info){
        let container = document.getElementById('modal');
        

        document.getElementById('add-company').addEventListener('click', async () => {
            new AddNewCompany(container, this.city, null , 'add-company')
        })
        for (let i = 0; i < info.length; i++) {
            let Ninfo = info[i]
            document.getElementById(`edit-region-${Ninfo.id}`).addEventListener('click', async () => {
                console.log(`Edit - Company ${Ninfo.id}`);
                new AddNewCompany(container, Ninfo, this.city , 'edit-company')
            });
            document.getElementById(`delete-region-${Ninfo.id}`).addEventListener('click', async () => {
                console.log(`Delete - Company ${Ninfo.id}`);

            })
        }
    }
}
export {Company}