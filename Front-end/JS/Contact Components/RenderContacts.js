import {Contact} from '../Contact Components/contacts.js';
import {getToken, getContactAvatar} from '../General Functions/getdata.js';
import { DeleteElements } from '../General Functions/Delete.js';

class CreateRows {
    constructor(element, info, channels) {
        this.element = element;
        this.channels = channels;
        this.element.innerHTML = this.companyConstructor(info)
        this.element.classList.add( 'container');
        this.selectedContacts = [];
        this.addEventListener(info);
    }
    
    companyConstructor(info) {
        
        let companyHTML = ''
        for (let i = 0; i < info.length; i++) {
            let Ninfo = info[i];
            let fillColor;
            const channel = this.channels[i];
            
            switch (true) {
                case (Ninfo.interest < 26):
                    fillColor = '#1CC1F5';
                    break;
                    case (Ninfo.interest <51) :
                        fillColor = '#FFC700';
                        break;
                        case (Ninfo.interest <76):
                            fillColor ='#FF6F00';
                            break;
                            case (Ninfo.interest >= 77):
                                fillColor = '#DE0028';
                                break;
                                
                            }
                            companyHTML = companyHTML + `
            <div id='del'>
                <div class="row" id="rowSelector-${Ninfo.id}">
                    <div class="checkbox">
                        <div class="select-row container"><input type="checkbox" id="selectcontact-${Ninfo.id}"/> </div>
                    </div>
                    <div class="contact">
                        <div class='img'><img src="#" id='imgCircle-${Ninfo.id}' alt='user imagen'>
                        </div>
                        <div class= "name">
                        <h4>${Ninfo.first_name}</h4>
                        <h5>${Ninfo.last_name}</h5>
                        </div>
                        
                    </div>
                    <div class="Region">
                        <div class="location">
                        <h4> ${Ninfo.region_name}</h4>
                        <h5>${Ninfo.country_name}</h5>
                        </div>
                        
                    </div>
                    <div class="Compania">
                        <h4>${Ninfo.company_name}</h4>
                        
                    </div>
                    <div class="job">
                        <h4>${Ninfo.job_position}</h4>
                        
                    </div>
                    <div class="prefCanal" id='channels-${Ninfo.id}'>
                    <div class='channels'>
                    `
                    if (channel.length > 2) {
                        for (let i = 0; i < 2; i++) {
                            let Nchannel = channel[i];
                            companyHTML = companyHTML + `
                            <div class='block' id='info-${Ninfo.id}'> ${Nchannel.contact_channel_type_id}</div>
                            `
                            }
                        
                    } else{
                        for (let i = 0; i < channel.length; i++) {
                            let Nchannel = channel[i];
                            companyHTML = companyHTML + `
                            <div class='block' id='Nchannel-${Nchannel.id} info-${Ninfo.id}'> ${Nchannel.contact_channel_type_id}</div>
                            `
                            }
                    }
                        
                    
                    
                    companyHTML = companyHTML +`
                    </div>`
                    
                    if (channel.length > 2) {
                        companyHTML = companyHTML + `
                        <div class='plus' id='info-${Ninfo.id}'> <i class="fas fa-ellipsis-h"></i> </div>
                        `
                    }
                    
                    companyHTML = companyHTML + `
                    </div>
                    <div class="interest">
                        <div class='interest-bar'>
                            <div class='text'>
                            <span>${Ninfo.interest}%</span>
                            </div>
                            <div class='bar'>
                                <div class='background'></div>
                                <div class='fill-bar' style= 'width: ${Ninfo.interest}%; background-color: ${fillColor}'></div>
                            </div>
                        </div>
                    </div>
                    <div class="actions" id='act-${Ninfo.id}'>
                        <div class="cont">
                            <i class="fas fa-ellipsis-h"></i>
                            <div class='options'>
                                <div class='menu-optiones'> 
                                    <div class='row-options' id = 'edit-${Ninfo.id}'><p>Editar</p></div>
                                    <div class='row-options' id = 'delete-${Ninfo.id}'><p>Borrar</p></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            `
            //console.log('cierra el for grande')
        }
        return (companyHTML);
            }
            async addEventListener(info){
        for (let i = 0; i < info.length; i++) {
            let Ninfo = info[i];
            const channel = this.channels[i];
            document.getElementById(`edit-${Ninfo.id}`).addEventListener('click', async () => {
                    let token = getToken();
                    var ver = token.substring(0, token.length - 1);
                    
                    let url1 = 'http://localhost:3000/regions';
                    let url2 = 'http://localhost:3000/country';
                    let url3 = 'http://localhost:3000/city';
                    let url4 = 'http://localhost:3000/Channeltype';
                    let url5 = 'http://localhost:3000/company'
                    let channels = `http://localhost:3000/contactChannel/${Ninfo.id}`
                    try {
                        let options = {
                            type: 'GET',
                            headers: {
                                "Authorization": `Bearer ${ver}`,
                                'Content-Type': 'application/json'
                            },
                        };
                        const responseReg = await fetch(url1, options);
                        const infoReg = await responseReg.json();
                        
                        const responseCou = await fetch(url2, options);
                        const infoCou = await responseCou.json();
                        
                        const responseCi = await fetch(url3, options);
                        const infoCi = await responseCi.json();

                        const responsechan = await fetch(url4, options);
                        const infoChan = await responsechan.json();

                        const responseComp = await fetch(url5, options);
                        const infoComp = await responseComp.json();

                        const infor = await fetch(channels, options);
                        const infoChannel = await infor.json();
                        console.log(infoChannel);
                        var ordCoun = [];
                        for (let i = 0; i < infoReg.length; i++) {
                            let info = infoReg[i].id
                            ordCoun[i] = infoCou.filter(function (el) 
                            {
                                return el.redion_id == info;
                            });
                            
                        };
                        var ordCi = [];
                        for (let i = 0; i < infoCou.length; i++) {
                            let info = infoCou[i].id
                            ordCi[i] = infoCi.filter(function (el) 
                            {
                                return el.country_id == info;
                            });
                            
                        };
                        //let sChannel=[];
                        //for (let i = 0; i < infoChannel.length; i++) {
                        //    const chan = infoChannel[i];
                        //    let channelsType = `http://localhost:3000/Channeltype/${chan.contact_channel_type_id}`
                        //    const response5 = await fetch(channelsType, options);
                        //    const channeltypes = await response5.json();
                        //    chan.contact_channel_type_id = channeltypes[0].channel;
                        //    sChannel.push(chan);
                        //    }
                        //console.log(infoChannel)
                        const contacts = new Contact(document.getElementById('contacts-window'), 'edit', infoReg, ordCoun, ordCi, infoChan, infoComp, Ninfo, infoChannel);

                    }catch {
                        console.log('error')
                    }
            });
            document.getElementById(`delete-${Ninfo.id}`).addEventListener('click', () => {
                console.log(`delete contact-${Ninfo.id}`);
                new DeleteElements(document.getElementById('modal-2'), Ninfo, 'contact');
            });
        }
        for (let i = 0; i < info.length; i++) {
            const Ninfo = info[i];
            let imageObjectURL = await getContactAvatar(Ninfo.id);
            let img = document.getElementById(`imgCircle-${Ninfo.id}`);
            img.src = imageObjectURL;
        }

        let selectAllCheckbox = document.getElementById('select-all');
        selectAllCheckbox.addEventListener('change', (event) => {
            if(event.target.checked){
                this.selectAllContacts(true)
            } else {
                this.selectAllContacts(false)
            }
            this.updateTableActions()
        });
        let selectCheckboxs = document.querySelectorAll('*[id^="selectcontact"]')
            selectCheckboxs.forEach((checkbox) => {
            checkbox.addEventListener('click', (event) => {
            if (event.target.checked) {
                this.selectedContacts.push(parseInt(checkbox.id.split('-')[1]))
            } else {
                this.selectedContacts = this.selectedContacts.filter( (ele) => { 
                return ele != parseInt(checkbox.id.split('-')[1]);
            });
        }
        selectAllCheckbox.indeterminate = true;
        this.updateTableActions()
        })
})

    }
    selectAllContacts(isChecked) {
        let selectCheckboxs = document.querySelectorAll('*[id^="selectcontact"]')
        this.selectedContacts = [];
        selectCheckboxs.forEach((checkbox) => {
            checkbox.checked = isChecked;
            if(isChecked) {
                this.selectedContacts.push(parseInt(checkbox.id.split('-')[1]))
            }
        })

    }

    updateSelectedContacts() {
        console.log('Contacts selected' + this.selectedContacts.length)
        console.log('Selected' + this.selectedContacts)
    }

    updateTableActions() {
        let tableActionsHTML = '<div></div>';
        if(this.selectedContacts.length > 0) {
            tableActionsHTML = `
                <span id="n-selected-tag" class="n-selected-tag">${this.selectedContacts.length} ${this.selectedContacts.length > 1 ? 'seleccionados': 'seleccionado'}</span>
            `
        } 
        if (this.selectedContacts.length > 0) {
            tableActionsHTML += `
                <a id="delete-contacts" class='delete-contacts'><img src="/Front-end/img/delete-solid.svg" />${this.selectedContacts.length == 1 ? 'Eliminar contacto' : 'Eliminar contactos'}</a>
            `;
        }
        document.getElementById('table-actions').innerHTML = tableActionsHTML;

        let deleteContactBtn = document.getElementById('delete-contacts');
        if (deleteContactBtn) {
            deleteContactBtn.addEventListener('click', () => {
                console.log(this.selectedContacts)
                new ConfirmationModal(document.getElementById('modal'), {type: 'deleteContacts', contactIds: this.selectedContacts, message: this.selectedContacts.length > 1 ? `¿Estas seguro que deseas eliminar los contactos seleccionados?` : '¿Estas seguro que deseas eliminar el contacto seleccionado?'})
            })
        }
    }
    
}
export {CreateRows}
