
import {Location} from './locationConst.js';

function getToken() {
    let token = localStorage.getItem('token')
    if (token == null){
        let token = sessionStorage.getItem('token');
        return token
    }
    return token
}

async function getlocations() {
    let url1 = 'http://localhost:3000/regions';
    let url2 = 'http://localhost:3000/country';
    let url3 = 'http://localhost:3000/city';
    
    
    let token = getToken();
    if (token == null) {
        window.location.href = '/Front-end/HTML/login.html';
    }
    let Token= JSON.stringify(token);
    let fToken = Token.split('"', 3);
    let rToken = fToken[2];
    let ver = rToken.substring(0, rToken.length - 1);
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
        //Arrenge data
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
        
        const location = new Location (document.getElementById('regions'), infoReg, ordCoun, ordCi);
        
    } catch (error) {
        console.log(error);
    }
}

getlocations();