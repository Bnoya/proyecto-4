class Company {
    constructor(element, info) {

        this.element = element
        this.element.innerHTML = this.companyConstructor(info)
        this.element.innerHTML = this.element.innerHTML +
        `
        <div class="company container">
            <div class = "add-company">
            <button id="add-region" class="button">Agregar Compañia</button>
            </div>
        </div>
        `
        this.element.classList.add('Companies', 'container');
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
}
export {Company}