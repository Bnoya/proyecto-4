import {getToken, isAdmin} from '../General Functions/getdata.js';
import {Contact} from '../Contact Components/contacts.js';
import { SearchRows } from '../Contact Components/searchRows.js';
import {createNewRows} from '../Contact Components/Cards.js';
import {FilterSearch} from '../Filter-Search.js'

let token = getToken();
isAdmin();
if (token == null) {
    window.location.href = '/Front-end/HTML/login.html';
}else{
    var ver = token.substring(0, token.length - 1);
}


async function getContacts(){
    //let select = document.getElementById('numberOfContacts').value;

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

        //let number = info[0];

        //info.shift();
        //console.log(number/5);
        let full_Data = []
        let channels = [];
        
        for (let i = 0; i < info.length; i++) {

            let contact = info[i];
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
            if(channel != undefined || channel != null || channel != ''){
                for (let i = 0; i < channel.length; i++) {
                    let Nchannel = channel[i];
                    
                    let channelType = `http://localhost:3000/Channeltype/${Nchannel.contact_channel_type_id}`
                    const response5 = await fetch(channelType, options);
                    const channeltypes = await response5.json();
                    Nchannel.contact_channel_type_id = channeltypes[0].channel;
                    channels.push(Nchannel);
                }
                
                
            }
            if (company[0] == null) {
                contact.company_name = ''
            }else{
                contact.company_name = company[0].company_name;
            }
            if(region[0] == null){
                contact.region_name = ''
            }else {
                contact.region_name = region[0].region_name;
            }
            if (getCountry[0] == null) {
                contact.country_name = '';
            }else {
                contact.country_name = getCountry[0].country_name;
            }
            if(contact.interest == null){
                contact.interest = '0';
            }
            full_Data.push(contact)
        }
        var ordChannels = [];
            for (let i = 0; i < full_Data.length; i++) {
                let info = full_Data[i].id
                ordChannels[i] = channels.filter(function (el) 
                {
                    return el.contact_id == info;
                });
                
            };
            //console.log(ordChannels);
        createNewRows(full_Data, ordChannels);
    } catch (error) {
        console.log(error);
    }
    let countryUrl=`http://localhost:3000/country`;
    let companyUrl=`http://localhost:3000/company`;
    let channelUrl=`http://localhost:3000/Channeltype`;
    try {
        let options = {
            type: 'GET',
            headers: {
                'Authorization': `Bearer ${ver}`,
                'Content-Type': 'application/json'
            },
        };
        const responseCountry= await fetch(countryUrl, options);
        const country = await responseCountry.json();

        const responseCompany= await fetch(companyUrl, options);
        const company = await responseCompany.json();

        const responseChannel= await fetch(channelUrl, options);
        const channel = await responseChannel.json();
        
        //console.log(channel);

        //let Nsearch = document.getElementById('searchBar').addEventListener('click', () => {
        //    const filter = new FilterSearch(document.getElementById('filter'), country, company, channel )
        //})
    }catch{
        console.log('not working')
    }
}

let contact = document.getElementById('contactsBt').addEventListener('click', async () => {
    console.log('toque el boton');
    let url1 = 'http://localhost:3000/regions';
    let url2 = 'http://localhost:3000/country';
    let url3 = 'http://localhost:3000/city';
    let url4 = 'http://localhost:3000/Channeltype';
    let url5 = 'http://localhost:3000/company'
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
        
        const contacts = new Contact(document.getElementById('contacts-window'), 'create', infoReg, ordCoun, ordCi, infoChan, infoComp);
    }catch {
        console.log('error')
    }
});

let Ncontact = document.getElementById('addBoton').addEventListener('click', async () => {
    console.log('toque el boton');
    let url1 = 'http://localhost:3000/regions';
    let url2 = 'http://localhost:3000/country';
    let url3 = 'http://localhost:3000/city';
    let url4 = 'http://localhost:3000/Channeltype';
    let url5 = 'http://localhost:3000/company'
    
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
        
        const contacts = new Contact(document.getElementById('contacts-window'), 'create', infoReg, ordCoun, ordCi, infoChan, infoComp);
    }catch {
        console.log('error')
    }
});

document.getElementById('searchNow').addEventListener('click', async () => {
    let rows =document.getElementsByClassName("row");
    //console.log(rows);
    let del = document.querySelectorAll('[id=del]');
    for (let i = 0; i <del.length; i++) {
        const delone = del[i];
        delone.parentElement.removeChild(delone);
    }
    let data = document.getElementById('autoComplete');
    console.log(data.value);
    if (data.value == '') {
        getContacts();
    } else {
    let one = `http://localhost:3000/contact-search-six/${data.value}`;
    
    try{
        let token = getToken();
        var ver = token.substring(0, token.length - 1);
        let channels = [];
        let options = {
            type: 'GET',
            headers: {
                "Authorization": `Bearer ${ver}`,
                'Content-Type': 'application/json'
            },
        };
        const one_response = await fetch(one, options);
        const info = await one_response.json();

        for (let i = 0; i < info.length; i++) {
            const Ninfo = info[i];
            let contactChannel = `http://localhost:3000/contactChannel/${Ninfo.id}`;
            const response4 = await fetch(contactChannel, options);
            const channel = await response4.json();
            
            if(channel != undefined || channel != null || channel != ''){
                for (let i = 0; i < channel.length; i++) {
                    let Nchannel = channel[i];
                    
                    let channelType = `http://localhost:3000/Channeltype/${Nchannel.contact_channel_type_id}`
                    const response5 = await fetch(channelType, options);
                    const channeltypes = await response5.json();
                    console.log(channeltypes);
                    Nchannel.contact_channel_type_id = channeltypes[0].channel;
                    channels.push(Nchannel);
                }
                
                
            }
        }
        var ordChannels = [];
            for (let i = 0; i < info.length; i++) {
                let ninfo = info[i].id
                ordChannels[i] = channels.filter(function (el) 
                {
                    return el.contact_id == ninfo;
                });
                
            };

            //console.log(channels)
        const contactsRender = new SearchRows(document.getElementById('list'), info , ordChannels);

    }catch{
        console.log('la vida es una desgracia')
    }
}
});

getContacts();

//document.getElementById('numberOfContacts').addEventListener('change', async () => {
//    let select = document.getElementById('numberOfContacts').value;
//    let del = document.querySelectorAll('[id=del]');
//    for (let i = 0; i <del.length; i++) {
//        const delone = del[i];
//        delone.parentElement.removeChild(delone);
//    }
//    let url=`http://localhost:3000/contact/1&${select}`;
//
//    
//    try {
//        let options = {
//            type: 'GET',
//            headers: {
//                'Authorization': `Bearer ${ver}`,
//                'Content-Type': 'application/json'
//            },
//        };
//        const response= await fetch(url, options);
//        const info = await response.json();
//
//        let number = info[0];
//
//        info.shift();
//        //console.log(number/5);
//        let full_Data = []
//        let channels = [];
//        
//        for (let i = 0; i < info.length; i++) {
//
//            let contact = info[i];
//            let companyName = `http://localhost:3000/company/${contact.company_id}`;
//            let regionName = `http://localhost:3000/regions/${contact.region_id}`;
//            let countryName = `http://localhost:3000/country/id/${contact.country_id}`;
//            
//            let contactChannel = `http://localhost:3000/contactChannel/${contact.id}`;
//            
//            const response1= await fetch(companyName, options);
//            const company = await response1.json();
//            const response2= await fetch(regionName, options);
//            const region = await response2.json();
//            const response3= await fetch(countryName, options);
//            const getCountry = await response3.json();
//            
//            const response4 = await fetch(contactChannel, options);
//            const channel = await response4.json();
//            if(channel != undefined || channel != null || channel != ''){
//                for (let i = 0; i < channel.length; i++) {
//                    let Nchannel = channel[i];
//                    
//                    let channelType = `http://localhost:3000/Channeltype/${Nchannel.contact_channel_type_id}`
//                    const response5 = await fetch(channelType, options);
//                    const channeltypes = await response5.json();
//                    Nchannel.contact_channel_type_id = channeltypes[0].channel;
//                    channels.push(Nchannel);
//                }
//                
//                
//            }
//            contact.company_name = company[0].company_name;
//            contact.region_name = region[0].region_name;
//            contact.country_name = getCountry[0].country_name;
//            if(contact.interest == null){
//                contact.interest = '0';
//            }
//            full_Data.push(contact)
//        }
//        var ordChannels = [];
//            for (let i = 0; i < full_Data.length; i++) {
//                let info = full_Data[i].id
//                ordChannels[i] = channels.filter(function (el) 
//                {
//                    return el.contact_id == info;
//                });
//                
//            };
//            //console.log(ordChannels);
//            console.log(url)
//            console.log(full_Data);
//        createNewRows(full_Data, ordChannels);
//    } catch (error) {
//        console.log(error);
//    }
//    let countryUrl=`http://localhost:3000/country`;
//    let companyUrl=`http://localhost:3000/company`;
//    let channelUrl=`http://localhost:3000/Channeltype`;
//    try {
//        let options = {
//            type: 'GET',
//            headers: {
//                'Authorization': `Bearer ${ver}`,
//                'Content-Type': 'application/json'
//            },
//        };
//        const responseCountry= await fetch(countryUrl, options);
//        const country = await responseCountry.json();
//
//        const responseCompany= await fetch(companyUrl, options);
//        const company = await responseCompany.json();
//
//        const responseChannel= await fetch(channelUrl, options);
//        const channel = await responseChannel.json();
//        
//        //console.log(channel);
//
//        //let Nsearch = document.getElementById('searchBar').addEventListener('click', () => {
//        //    const filter = new FilterSearch(document.getElementById('filter'), country, company, channel )
//        //})
//    }catch{
//        console.log('not working')
//    }
//})






