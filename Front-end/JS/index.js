import {getToken} from './getdata.js';
import {Contact} from './contacts.js';
import {createRows} from './Cards.js';

let token = getToken();

if (token == null) {
    window.location.href = '/Front-end/HTML/login.html';
}else{
    var ver = token.substring(0, token.length - 1);
}


async function getContacts(){
    let url=`http://localhost:3000/contact`;

    
    try {
        let options = {
            type: 'GET',
            headers: {
                'Authorization': `Bearer ${ver}`,
                'Content-Type': 'application/json'
            },
        };
        const response= await fetch(url, options);
        const info = await response.json();
        
        
        let full_Data = []
        for (let i = 0; i < info.length; i++) {
            const contact = info[i];
            let companyName = `http://localhost:3000/company/${contact.company_id}`;
            let regionName = `http://localhost:3000/regions/${contact.region_id}`;
            let countryName = `http://localhost:3000/country/id/${contact.country_id}`;
            
            let contactChannel = `http://localhost:3000/contactChannel/${contact.id}`;
            
            const response1= await fetch(companyName, options);
            const company = await response1.json();
            const response2= await fetch(regionName, options);
            const region = await response2.json();
            const response3= await fetch(countryName, options);
            const getCountry = await response3.json();
            
            const response4 = await fetch(contactChannel, options);
            const channel = await response4.json();
            console.log(contact);

            if(channel !== undefined || channel !== null || channel !== ''){
                let channels = [];
                for (let i = 0; i < channel.length; i++) {
                    let Nchannel = channel[i];
                    console.log(Nchannel)
                    let channelType = `http://localhost:3000/Channeltype/${Nchannel.contact_channel_type_id}`
                    const response5 = await fetch(channelType, options);
                    const channeltypes = await response5.json();
                    console.log(channeltypes)
                    Nchannel.contact_channel_type_id = channeltypes[0].channel;
                    channels.push(Nchannel);
                }
                contact.channel = channels.channel
                console.log(channels);
            }
            contact.company_id = company[0].company_name;
            contact.region_id = region[0].region_name;
            contact.country_id = getCountry[0].country_name;
            //contact.
            if(contact.interest == null){
                contact.interest = '0';
            }
            console.log(contact)
            full_Data.push(contact)
        }
        console.log(full_Data)
        createRows(full_Data);
    } catch (error) {
        console.log(error);
    }
}

let contact = document.getElementById('contactsBt').addEventListener('click', () => {
    console.log('toque el boton');
    const contacts = new Contact(document.getElementById('contacts-window'), 1);
});

let Ncontact = document.getElementById('addBoton').addEventListener('click', () => {
    console.log('toque el boton');
    const contacts = new Contact(document.getElementById('contacts-window'), 1);
})

let Nsearch = document.getElementById('searchBar').addEventListener('click', () => {
    console.log('activar filtro')
})
getContacts();








