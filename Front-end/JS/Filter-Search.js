

class FilterSearch {
    constructor(element, country, company, channel) {
        this.element = element;
        this.country = country;
        this.company = company;
        this.channel = channel;
        console.log(this.element);
        console.log(this.country);
        console.log(this.company);
        console.log(this.channel);
        //this.element.classList.add('modal');
        this.element.innerHTML = this.innerHTML();
        //this.addeventlisteners();
    }
    innerHTML() {
        let filterHTML = '';
        filterHTML = filterHTML + `
        <div class ='filterContainer'>
            <div class='options'>
                <div class='contactName'>
                    <label for='name'>Nombre de contacto: </label>
                    <input type="text" id="contactName" placeholder='Introduce el nombre del contacto'/>
                </div>
                <div class='job'>
                    <label for='job'>Cargo: </label>
                    <input type="text" id="contactJob" placeholder='Introduce el cargo del contacto'/>
                </div>
                <div class='country'>
                    <label for='country'>Pais/Region: </label>
                    <Select name="country" id= "country">
                    <option value="all"> Todos </option>
                    `
                    for (let i = 0; i < this.country.length; i++) {
                        const country = this.country[i];
                        filterHTML += `
                            <option value="${country.id}"> ${country.country_name} </option>          
                            `;
                    };
                    filterHTML +=
                    `
                    </select>
                </div>
                <div class='company'>
                    <label for='company'>Compañia: </label>
                    <Select name="company" id= "company">
                    <option value="all"> Todos </option>
                    `
                    for (let i = 0; i < this.company.length; i++) {
                        const company = this.company[i];
                        filterHTML += `
                            <option value="${company.id}"> ${company.company_name} </option>          
                            `;
                    };
                    filterHTML +=
                    `
                    </select>
                </div>
                <div class='channel'>
                    <label for='channel'>Canal favorito: </label>
                    <Select name="channel" id= "channel">
                    <option value="all"> Cualquiera </option>
                    `
                    for (let i = 0; i < this.channel.length; i++) {
                        const channel = this.channel[i];
                        filterHTML += `
                            <option value="${channel.id}"> ${channel.channel_type} </option>          
                            `;
                    };
                    filterHTML +=
                    `
                    </select>
                </div>
                <div class='interest'>
                    <label for='interest'>Interes: </label>
                    <Select name="interest" id= "interest">
                        <option value="all"> Cualquiera </option>
                        <option value='0'>0%</option>
                        <option value='25'>25%</option>
                        <option value='50'>50%</option>
                        <option value='75'>75%</option>
                        <option value='100'>100%</option>
                    </select>
                </div>
            </div>
        </div>
        `
        return(filterHTML);
    }
}

export{FilterSearch}