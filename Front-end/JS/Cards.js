import {getToken} from './getdata.js';
let token = getToken();
if (token == null) {
    window.location.href = '/Front-end/HTML/login.html';
}else{
    var ver = token.substring(0, token.length - 1);
}

async function createRows(contacts) {
    let container = document.createElement('div');
        for (let i = 0; i < contacts.length; i++) {
                try{
                    let contact = contacts[i];
                    let regionName = `http://localhost:3000/regions/${contact.region_id}`;
                    let companyName = `http://localhost:3000/company/${contact.company_id}`;
                    let countryName = `http://localhost:3000/country/id/${contact.country_id}`;

                    let options = {
                        type: 'GET',
                        headers: {
                            'Authorization': `Bearer ${ver}`,
                            'Content-Type': 'application/json'
                        },
                    };
                    //get company name 
                    console.log('data')
                    const response1= await fetch(companyName, options);
                    const company = await response1.json();
                    console.log(company);
                    //get region name
                    const response2= await fetch(regionName, options);
                    const region = await response2.json();
                    console.log(region);
                    
                    //get country name 
                    const response3= await fetch(countryName, options);
                    const country = await response3.json();
                    console.log(country);
                    
                } catch{

                }

            }

            let row = document.createElement('div');
            let check = document.createElement('div');
        }

        

//actions logo
//<i class="fas fa-ellipsis-h"></i>



export {createRows}