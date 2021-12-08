

class CreateRows {
    constructor(element, info, channels) {
        this.element = element;
        this.channels = channels;
        this.element.innerHTML = this.companyConstructor(info)
        this.element.innerHTML = this.element.innerHTML +
        `
        <div class="contacts container">
            
        </div>
        `
        this.element.classList.add( 'container');
        this.addEventListener(info);
        }
        
    companyConstructor(info) {

        let companyHTML = ''
        for (let i = 0; i < info.length; i++) {
            let fillColor;
            let Ninfo = info[i];
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
            <div class="row" id="rowSelector-${Ninfo.id}">
                <div class="checkbox">
                    <input type="checkbox" id='allChecked-${Ninfo.id}'>
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
            `
            //console.log('cierra el for grande')
        }
        return(companyHTML)
        
    }
    addEventListener(info){
        for (let i = 0; i < info.length; i++) {
            let Ninfo = info[i];
            const channel = this.channels[i];
            document.getElementById(`edit-${Ninfo.id}`).addEventListener('click', () => {
                console.log('edit contact');
            });
            document.getElementById(`delete-${Ninfo.id}`).addEventListener('click', () => {
                console.log('delete contact');
            });

            document.getElementById(`allChecked-${Ninfo.id}`).addEventListener('click', () => {
                let row = document.getElementById(`rowSelector-${Ninfo.id}`);
                let check = document.getElementById(`allChecked-${Ninfo.id}`);
                console.log(check);
                //row.style.backgroundColor = '#e8e8e8e8';
            })

        //    for (let i = 0; i < channel.length; i++) {
        //        let Nchannel = channel[i];
        //        document.getElementById(`Nchannel-${Nchannel.id} info-${Ninfo.id}`).addEventListener('click', async () => {
        //        console.log(`Show channel, Nchannel-${Nchannel.id} info-${Ninfo.id}`)
        //    })
        //    }
        }
    }
}
export {CreateRows}
