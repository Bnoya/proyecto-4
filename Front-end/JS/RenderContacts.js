class CreateRows {
    constructor(element, info) {
        this.element = element
        this.element.innerHTML = this.companyConstructor(info)
        this.element.innerHTML = this.element.innerHTML +
        `
        <div class="contacts container">
            
        </div>
        `
        this.element.classList.add( 'container');
        }

    companyConstructor(info) {

        let companyHTML = ''
        for (let i = 0; i < info.length; i++) {
            let Ninfo = info[i]
            companyHTML = companyHTML + `
            <div class="row" id="rowSelector">
                <div class="checkbox">
                    <input type="checkbox">
                </div>
                <div class="contact">
                    <div class='img'>
                    </div>
                    <div class= "name">
                    <h4>${Ninfo.first_name}</h4>
                    <h5>${Ninfo.last_name}</h5>
                    </div>
                    
                </div>
                <div class="Region">
                    <div class="location">
                    <h4> ${Ninfo.region_id}</h4>
                    <h5>${Ninfo.country_id}</h5>
                    </div>
                    
                </div>
                <div class="Compania">
                    <h4>${Ninfo.company_id}</h4>
                    
                </div>
                <div class="job">
                    <h4>${Ninfo.job_position}</h4>
                    
                </div>
                <div class="prefCanal">
                    <h4>Canal Preferido</h4>
                    
                </div>
                <div class="interest">
                    <h4>${Ninfo.interest}</h4>
                    
                </div>
                <div class="actions" id='act-${Ninfo.id}'>
                    <h4><i class="fas fa-ellipsis-h"></i></h4>
                </div>
            </div>
            `
        }
        return(companyHTML)
        
    }
}
export {CreateRows}
