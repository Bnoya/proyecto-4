import {AddLocationModal} from './AddLocationModal.js';

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
        this.addEventListeners(infoReg, ordCoun, ordCi);
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
                            <div class="icon" id="edit-region-${reg.id}"><img src="/Front-end/img/edit-solid.svg" class="img" alt=""></div>
                            <div id="delete-region-${reg.id}" class="icon"><img src="/Front-end/img/delete-solid.svg" class="img" alt=""></div>
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
                    const cities = ordCi[Rcount.id - 1];
                            countriesHTML = countriesHTML + `
                            <div class="country container" id="country-${Rcount.id}">
                            <div class="country-header container">
                            <div class="country-cointained">
                            <h4>${Rcount.country_name}</h4>
                            <div class="edit-button">
                            <div id="edit-country-${Rcount.id}" class="icon"><img src="/Front-end/img/edit-solid.svg" class="img" alt=""></div>
                            <div id="delete-country-${Rcount.id}" class="icon" ><img src="/Front-end/img/delete-solid.svg" class="img" alt=""></div>
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
                        <div id="edit-city-${Rcity.id}" class="icon"><img src="/Front-end/img/edit-solid.svg" alt="" class="img"></div>
                        <div id="delete-city-${Rcity.id}" class="icon" ><img src="/Front-end/img/delete-solid.svg" alt="" class="img"></div>
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

    addEventListeners(infoReg, ordCoun, ordCi){

        let modalDiv = document.getElementById('modal');
        // add region
        document.getElementById('add-region').addEventListener('click', async () => {
            new AddLocationModal(modalDiv, null, null, 'region');
        })

        for (let i = 0; i < infoReg.length; i++) {
            const region = infoReg[i];
            const countries = ordCoun[i];
            let countryR = countries; 
            //edit region
            document.getElementById(`edit-region-${region.id}`).addEventListener('click', () => {
                console.log('edit region ' + region.id)
                new AddLocationModal(modalDiv, region.region_name, null, 'edit-region')
            });
            // delete region
            document.getElementById(`delete-region-${region.id}`).addEventListener('click', () => {
                console.log('delete region' + region.id)
            })
            // add country to region
            document.getElementById(`add-country-to-region-${region.id}`).addEventListener('click', () => {
                new AddLocationModal(modalDiv, region.region_id, infoReg, 'country')
            })

            for (let j = 0; j < countryR.length; j++) {
                const Rcount = countries[j];
                const cities = ordCi[Rcount.id - 1];
                 // edit country
                document.getElementById(`edit-country-${Rcount.id}`).addEventListener('click', () => {
                    new AddLocationModal(modalDiv, region.region_id, infoReg, 'edit-country')
                    console.log('edit country' + Rcount.id)
                })
                // delete country
                document.getElementById(`delete-country-${Rcount.id}`).addEventListener('click', () => {
                    console.log('delete country' + Rcount.id)
                })
                for (let k = 0; k < cities.length; k++) {
                    const city = cities[k];
                    // edit city
                    document.getElementById(`edit-city-${city.id}`).addEventListener('click', () => {
                        new AddLocationModal(modalDiv, Rcount.country_id, Rcount, 'edit-city')
                        console.log('edit city' + city.id)
                    })
                    // delete city
                    document.getElementById(`delete-city-${city.id}`).addEventListener('click', () => {
                        console.log('delete city' + city.id)
                    })
                    // add city to country
                    document.getElementById(`add-city-to-country-${Rcount.id}`).addEventListener('click', () => {
                        console.log(Rcount);
                        console.log(countries);
                        new AddLocationModal(modalDiv, Rcount.country_id, countries, 'city')
                    })
                }
            }
        }
    }
}

export { Location }