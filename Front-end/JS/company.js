import { Company } from "./CompanyClass.js";


function getToken() {
    let token = localStorage.getItem('token')
    if (token == null){
        let token = sessionStorage.getItem('token');
        return token
    }
    return token
}

async function getCompany() {
    let url = 'http://localhost:3000/company'
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
        const response = await fetch(url, options);
        const info = await response.json();
        var array = []
        for (let i = 0; i < info.length; i++) {
            let information = info[i]
            let url1 = `http://localhost:3000/cityId/${information.city_id}`;
            const response1 = await fetch(url1, options);
            const info1 = await response1.json();
            information.city_id = info1[0].city_name;
            array.push(information)
        }
        const company = new Company (document.getElementById('company'), array);

    } catch (error) {
        console.log(error);
    }
}

getCompany();
