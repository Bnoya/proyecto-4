

class Location {
    constructor(element, infoReg, ordCoun, ordCi) {

        this.element = element
        this.element.innerHTML = this.regionsConstructor(infoReg, ordCoun, ordCi)
        this.element.innerHTML = this.element.innerHTML +
        `
        <div class="region container">
            <p id="add-region">Agregar región</p>
        </div>
        `
        this.element.classList.add('location', 'container');
        }
    
        regionsConstructor(infoReg, ordCoun, ordCi) {
            let regionsHTML = '';
            
            for (let i = 0; i < infoReg.length; i++) {
                const reg = infoReg[i];
                const countries = ordCoun[i];
                regionsHTML = regionsHTML + `
                <div class="region container" id="region-${reg.region_id}">
                    <div class="region-header container">
                        <div class="region-cointained">
                            <h3>${reg.region_name}</h3>
                            <div class="edit-button">
                            <div id="edit-region-${reg.id}" class="icon"><i class="fas fa-edit" ></i></div>
                            <div id="delete-region-${reg.id}" class="icon" ><i class="fas fa-trash-alt"></i></div>
                            </div>
                        </div>
                    </div>
                `
                regionsHTML = regionsHTML + this.countriesConstructor(countries, ordCi, reg);
                regionsHTML = regionsHTML + `
                    <div class="country container">
                        <p id="add-country-to-region-${reg.id}">Agregar país</p>
                    </div>
                </div>
                `
            }
            return(regionsHTML);
        }

    countriesConstructor(countries, ordCi, reg) {
        let countriesHTML = '';
        let countryR = countries; 
                for (let j = 0; j < countryR.length; j++) {

                    const Rcount = countries[j];

                    console.log(Rcount);
                    const cities = ordCi[Rcount.id - 1];
                            countriesHTML = countriesHTML + `
                            <div class="country container" id="country-${Rcount.id}">
                            <div class="country-header container">
                            <div class="country-cointained">
                            <h4>${Rcount.country_name}</h4>
                            <div class="edit-button">
                            <div id="edit-region-${Rcount.id}" class="icon"><i class="fas fa-edit" ></i></div>
                            <div id="delete-region-${Rcount.id}" class="icon" ><i class="fas fa-trash-alt"></i></div>
                            </div>
                            </div>
                            </div>
                            `
                            let citiesHTML = '';

                    for (let k = 0; k < cities.length; k++) {
                        const Rcity = cities[k];

                        citiesHTML = citiesHTML + `
                        <div class="city container" id="div-city-${Rcity.id}">
                        <div class="city-cointained">
                        <h5>${Rcity.city_name}</h5>
                        <div class="edit-button">
                        <div id="edit-region-${Rcity.id}" class="icon"><i class="fas fa-edit" ></i></div>
                        <div id="delete-region-${Rcity.id}" class="icon" ><i class="fas fa-trash-alt"></i></div>
                        </div>
                        </div>
                        </div>
                        `
                    
                
                    };
                    citiesHTML = citiesHTML + `
                    <div class="city container">
                    <p id="add-city-to-country-${Rcount.id}">Agregar ciudad</p>
                    </div>`
                    countriesHTML = countriesHTML + citiesHTML;
                    countriesHTML= countriesHTML + `</div>`;
                    
                    
                    
                }
                return(countriesHTML)
        }
}

export { Location }