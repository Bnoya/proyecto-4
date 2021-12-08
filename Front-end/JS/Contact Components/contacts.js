import {AddChannel} from '../Contact Components/addContactChannel.js';

class Contact {
    constructor(element, selectedOption, infoReg, ordCoun, ordCi, infoChannel) {
        this.element = element;
        this.region = infoReg;
        this.country = ordCoun;
        this.city = ordCi;
        console.log(this.city);
        this.channel = infoChannel;
        
        this.element.innerHTML = this.innerHTML();
        
        this.element.classList.add('contacts-window');
        //document.getElementById(`contacts${selectedOption}`).classList.add('selected');
        this.addEventListeners();
    }
    innerHTML(){
        let contactHTML = `
        <div class='fullsize'>
        <div class='newCard'>
        <form class='addContact'>
                <div class="importantData">
                    <img class='imgCont'>
                    <div class='nameCont'>
                        <label for= 'name'> Nombre: </Label>
                        <input type="text" name="name" id='name'>
                    </div>
                    <div class="lastCont">
                        <label for="last">Apellido: </label>
                        <input type="text" name="last" id='last'>
                    </div>
                    <div class="jobCont">
                        <label for="job">Cargo: </label>
                        <input type="text" name="job" id='job'>
                    </div>
                    <div class="emailCont">
                        <label for="email">Email: </label>
                        <input type="text" name="email" id='email'>
                    </div>
                    <div class="companyCont">
                        <label for="company">Compania: </label>
                        <input type="text" name="company" id='company'>
                    </div>
                </div>
                <div class="secondaryData">
                    <div class="regionCont">
                        <label for="region">Region: </label>
                        <select name="region" id="regionSelect">
                        <option value="0"> Selecciona una...</option>
                        `
                        for (let i = 0; i < this.region.length; i++) {
                            let region = this.region[i];
                            contactHTML = contactHTML + `
                            <option value="${region.id}"> ${region.region_name} </option>
                            `
                        }

                        contactHTML = contactHTML + 


                        `
                        </select>
                    </div>
                    <div class="countryCont">
                        <label for="country">Pais: </label>
                        <select name="country" id="countrySelect">
                        <option value="0"> Selecciona una...</option>
                        `
                        for (let i = 0; i < this.region.length; i++) {
                            let country = this.country[i];
                            for (let j = 0; j < country.length; j++) {
                                const final = country[j];
                                contactHTML = contactHTML + `
                                <option value="${final.id}" id='country-${final.redion_id}- off' class= 'off'> ${final.country_name} </option>
                                `
                            }
                        }

                        contactHTML = contactHTML + 


                        `
                        </select>
                    </div>
                    <div class="cityCont">
                        <label for="city">Ciudad: </label>
                        <select name="city" id="citySelector">
                        <option value="0"> Selecciona una...</option>
                        `
                        for (let i = 0; i < this.city.length; i++) {
                            let city = this.city[i];
                            for (let j = 0; j < city.length; j++) {
                                const final = city[j];
                                contactHTML = contactHTML + `
                                <option value="${final.id}" id='city-${final.country_id}- off' class= 'off-city'> ${final.city_name} </option>
                                `
                                
                            }
                        }

                        contactHTML = contactHTML + 


                        `
                        </select>
                    </div>
                    <div class="addressCont">
                        <label for="address">Direccion: </label>
                        <input type="text" name="address" id='address'>
                    </div>
                    <div class="intrestCont">
                        <label for="intrest">Interes: </label>
                        <div class='inputCont'>
                        <div class="selector"></div>
                        <select name="intrest" id="intrest">
                        <option value="0">0%</option>
                        <option value="25">25%</option>
                        <option value="50">50%</option>
                        <option value="75">75%</option>
                        <option value="100">100%</option>
                        </select>
                        </div>
                    </div>
                </div>
                <div class='channels'>
                <div class='contact'>
                            <div class='thirdData'>
                                <div class="contactCont"> 
                                    <label for="contact">Canal de Contacto: </label>
                                    <select name="contact" id="contChannel">
                                    <option value="0"> Selecciona una...</option>
                                `
                                for (let i = 0; i < this.channel.length; i++) {
                                    let channel = this.channel[i];
                                    contactHTML = contactHTML + `
                                    <option value="${channel.id}"> ${channel.channel} </option>
                                    `
                                }

                                contactHTML = contactHTML + `
                                    </select>
                                </div>
                                <div class="userAccount">
                                    <label for="account">Cuenta del Usuario: </label>
                                    <input type="text" name="account" id="account" placeholder="@ejemplo">
                                </div>
                                <div class="preffCont">
                                    <label for="preff">Preferencias: </label>
                                    <select name="preff" id="preff">
                                        <option value="0"> Selecciona una...</option>
                                        <option value ='1'>Canal Favorito  </option>
                                        <option value='2'>No Molestar </option>
                                        <option value='3'>Solo Emergencias</option>
                                    </select>
                                </div>
            
                                </div>
                                <div class='extraData' id='extraData'></div>
                                </div>
                                <div class = 'addBt'>
                                    <div class="addCont" id='addNewChannel'>
                                        <div class='button' ><p id="addChannel">+ Agregar Canal </p></div>
                                    </div>
                                </div>
            </div>
                <div class="Send">
                    <button id="addContact" class='primary_btn'>Agregar Contacto</button>
                    <button id="cancel" class ='secondary_btn'>Cancelar</button>
                </div>
            </form>
        </div>
        </div>
        `
        return(contactHTML);
    }

    addEventListeners(){

        document.getElementById('addChannel').addEventListener('click', async () => {
            console.log('add channel');
            console.log('toque el boton');
            let div = document.getElementById('extraData');
            div.style.display = 'flex';
            const channel = new AddChannel(div, this.channel)
        });
        
        
        
        document.getElementById('regionSelect').addEventListener('click', () => {
            let region = document.getElementById('regionSelect');
            
            if (region.value > 0) {
                let off = document.querySelectorAll('option.off');
                for (let j = 0; j < off.length; j++) {
                    const turnOff = off[j];
                    turnOff.style.display = 'none';
                }


                let country = document.querySelectorAll(`[id^='country-${region.value}-']`);
                for (let i = 0; i < country.length; i++) {
                    const each = country[i];
                    each.style.display= 'block';
                }
            }
        });
        document.getElementById('countrySelect').addEventListener('click', () => {
            let country = document.getElementById('countrySelect');

            if (country.value > 0) {
                let off = document.querySelectorAll('option.off-city');
                for (let j = 0; j < off.length; j++) {
                    const turnOff = off[j];
                    turnOff.style.display = 'none';
                }
                let city = document.querySelectorAll(`[id^='city-${country.value}-']`);
                console.log(city);
                for (let i = 0; i < city.length; i++) {
                    const each = city[i];
                    each.style.display= 'block';
                }
            }
        })


        document.getElementById('addContact').addEventListener('click', async () => {
            let name = document.getElementById('name').value;
            let last = document.getElementById('last').value;
            let job = document.getElementById('job').value;
            let email = document.getElementById('email').value;
            let company = document.getElementById('company').value;
            let region = document.getElementById('regionSelect').value;
            let country = document.getElementById('countrySelect').value;
            let city = document.getElementById('citySelector').value;
            let address = document.getElementById('address').value;
            let intrest = document.getElementById('intrest').value;
            let channel = document.getElementById('contChannel').value;
            let account = document.getElementById('account').value;
            let preff = document.getElementById('preff').value;
            alert('Trying and working');
            console.log(name, last, job, email, company, region, country, city, address, intrest, channel, account, preff)
            setTimeout(function(){ alert("Hello"); }, 3000);
        })
    }
}


export {Contact}