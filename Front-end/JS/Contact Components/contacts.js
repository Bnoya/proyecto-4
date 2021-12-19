import {AddChannel} from '../Contact Components/addContactChannel.js';
import {getToken} from '../General Functions/getdata.js';

class Contact {
    constructor(element, selectedOption, infoReg, ordCoun, ordCi, infoChannel, infoComp, Ninfo) {
        this.element = element;
        this.region = infoReg;
        this.country = ordCoun;
        this.city = ordCi;
        this.selectedOption = selectedOption;
        this.channel = infoChannel;
        this.company = infoComp;
        this.element.innerHTML = this.innerHTML();
        this.element.classList.add('contacts-window');
        this.addEventListeners(Ninfo);
    }
    innerHTML(){
        let contactHTML;

        switch (this.selectedOption) {

            case 'create':
                contactHTML = `
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
                                    <select name="company" id="companySelect">
                                        <option value="0"> Selecciona una...</option>
                                        `
                                        for (let i = 0; i < this.company.length; i++) {
                                            let company = this.company[i];
                                            contactHTML = contactHTML + `
                                            <option value="${company.id}"> ${company.company_name} </option>
                                            `
                                        }
                
                                        contactHTML = contactHTML + 
                
                
                                        `
                                        </select>
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
                                                <select name="contact" id="contChannel-0">
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
                                                <input type="text" name="account" id="account-0" placeholder="@ejemplo">
                                            </div>
                                            <div class="preffCont">
                                                <label for="preff">Preferencias: </label>
                                                <select name="preff" id="preff-0">
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
                                <button class="primary_btn" id="addContact">Crear Contacto</button>
                                <button class="secondary_btn" id="cancel">Cancelar</button>
                            </div>
                        </form>
                    </div>
                    </div>
                    `
                break;
        
            case 'edit':
                contactHTML = `
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
                                <select name="company" id="companySelect">
                                    <option value="0"> Selecciona una...</option>
                                    `
                                    for (let i = 0; i < this.company.length; i++) {
                                        let company = this.company[i];
                                        contactHTML = contactHTML + `
                                        <option value="${company.id}"> ${company.company_name} </option>
                                        `
                                    }
            
                                    contactHTML = contactHTML + 
            
            
                                    `
                                    </select>
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
                                            <select name="contact" id="contChannel-0">
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
                                            <input type="text" name="account" id="account-0" placeholder="@ejemplo">
                                        </div>
                                        <div class="preffCont">
                                            <label for="preff">Preferencias: </label>
                                            <select name="preff" id="preff-0">
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
                            <button class="primary_btn" id="edit-Contact">Editar Contacto</button>
                            <button class="secondary_btn" id="cancel">Cancelar</button>
                        </div>
                    </form>
                </div>
                </div>
                `
                break;

            
        }
        return(contactHTML);
    }

    addEventListeners(Ninfo){
        let count = 1;
        switch (this.selectedOption) {
            case 'edit':

                let name = document.getElementById('name');
                let last = document.getElementById('last');
                let job = document.getElementById('job');
                let email = document.getElementById('email');
                let company = document.getElementById('companySelect');
                let region = document.getElementById('regionSelect');
                let country = document.getElementById('countrySelect');
                let city = document.getElementById('citySelector');
                let address = document.getElementById('address');
                let interest = document.getElementById('intrest')
                //let channel = document.getElementById('contChannel');
                //let account = document.getElementById('account');
                //let preff = document.getElementById('preff');
                
                name.value = Ninfo.first_name;
                last.value = Ninfo.last_name;
                job.value = Ninfo.job_position;
                email.value = Ninfo.email;
                company.value = Ninfo.company_id;
                region.value = Ninfo.region_id;
                country.value = Ninfo.country_id;
                city.value = Ninfo.city_id;
                address.value = Ninfo.contact_address;
                interest.value = Ninfo.interest;



                document.getElementById('edit-Contact').addEventListener('click', async () => {
                    //event.preventDefault();
                    let name = document.getElementById('name').value;
                    let last = document.getElementById('last').value;
                    let job = document.getElementById('job').value;
                    let email = document.getElementById('email').value;
                    let company = document.getElementById('companySelect').value;
                    let region = document.getElementById('regionSelect').value;
                    let country = document.getElementById('countrySelect').value;
                    let city = document.getElementById('citySelector').value;
                    let address = document.getElementById('address').value;
                    let interest = document.getElementById('intrest').value;
                    let channel = document.getElementById('contChannel').value;
                    let account = document.getElementById('account').value;
                    let preff = document.getElementById('preff').value;
                    let addContact = 'http://localhost:3000/create-contact';
                    let addChannel = 'http://localhost:3000/create-contactChannel';
                    let rToken = getToken();
                    let ver = rToken.substring(0, rToken.length - 1);
                    const data_contact = {
                        "first_name": name,
                        "last_name": last,
                        "job_position": job,
                        "email": email,
                        "company_id": company,
                        "region_id": region,
                        "country_id": country,
                        "city_id": city,
                        "contact_address": address,
                        "interest": interest
                    };
                    console.log(data_contact);
                    let options_create = {
                        headers: {
                            'Authorization': `Bearer ${ver}`,
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(data_contact),
                        method: 'PUT'
                    };
                    try{
                        const response= await fetch(addContact, options_create);
                        const info = await response.json();
                        
                        console.log(info.data.id);
                        const data_channel ={
                            "contact_id": info.data.id,
                            "contact_channel_type_id": channel,
                            "socials_username":account,
                            "preferences":preff
                        }
                        let options_create_channel = {
                            headers: {
                                'Authorization': `Bearer ${ver}`,
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify(data_channel),
                            method: 'POST'
                        };
                        console.log(data_channel);
                        console.log(options_create_channel);
                        const response_channel= await fetch(addChannel, options_create_channel);
                        const info_channel = await response_channel.json();
                        console.log(info_channel);
                    }catch {
                        console.log(error)
                    };
                });
                break;
        
            case 'create':
                document.getElementById('addContact').addEventListener('click', async () => {
                    //event.preventDefault();
                    //console.log(count)
                    let name = document.getElementById('name').value;
                    let last = document.getElementById('last').value;
                    let job = document.getElementById('job').value;
                    let email = document.getElementById('email').value;
                    let company = document.getElementById('companySelect').value;
                    let region = document.getElementById('regionSelect').value;
                    let country = document.getElementById('countrySelect').value;
                    let city = document.getElementById('citySelector').value;
                    let address = document.getElementById('address').value;
                    let interest = document.getElementById('intrest').value;
                    let channel = [];
                    let account =[]
                    let preff = [];
                    let addContact = 'http://localhost:3000/create-contact';
                    let addChannel = 'http://localhost:3000/create-contactChannel';
                    let rToken = getToken();
                    let ver = rToken.substring(0, rToken.length - 1);
                    let option = 0;
                    for (let i = 0; i < count; i++) {
                        let channel_h = document.getElementById(`contChannel-${option}`).value;
                        let account_h = document.getElementById(`account-${option}`).value;
                        let preff_h = document.getElementById(`preff-${option}`).value;
                        channel.push(channel_h);
                        account.push(account_h);
                        preff.push(preff_h);
                        option = option+1;
                    }
                    //console.log(channel, account, preff);
                    const data_contact = {
                        "first_name": name,
                        "last_name": last,
                        "job_position": job,
                        "email": email,
                        "company_id": company,
                        "region_id": region,
                        "country_id": country,
                        "city_id": city,
                        "contact_address": address,
                        "interest": interest
                    };
                    //console.log(data_contact);
                    let options_create = {
                        headers: {
                            'Authorization': `Bearer ${ver}`,
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(data_contact),
                        method: 'POST'
                    };
                    try{

                        const response= await fetch(addContact, options_create);
                        const info = await response.json();
                        
                        for (let i = 0; i < channel.length; i++) {
                            const R_channel = channel[i];
                            const R_account = account[i];
                            const R_preff = preff[i];
                            
                            const data_channel ={
                                "contact_id": info.data.id,
                                "contact_channel_type_id": R_channel,
                                "socials_username":R_account,
                                "preferences":R_preff
                            }
                            let options_create_channel = {
                                headers: {
                                    'Authorization': `Bearer ${ver}`,
                                    'Content-Type': 'application/json'
                                },
                                body: JSON.stringify(data_channel),
                                method: 'POST'
                            };
                            //console.log(data_channel);
                            //console.log(options_create_channel);
                            const response_channel= await fetch(addChannel, options_create_channel);
                            const info_channel = await response_channel.json();
                            //console.log(info_channel);
                        }
                    }catch {
                        console.log(error)
                    };
                });
                break;
        }




        document.getElementById('addChannel').addEventListener('click', async () => {

            console.log('add channel');
            console.log('toque el boton');
            let div = document.getElementById('extraData');
            let cont = document.createElement('div');
            div.style.display = 'flex';
            cont.classList.add('Bigcontainer');
            div.appendChild(cont);
            const channel = new AddChannel(cont, this.channel, count)
            count = count +1;
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

        document.getElementById('cancel').addEventListener('click', () => {
            location.reload();
        })
        
    }
}


export {Contact}