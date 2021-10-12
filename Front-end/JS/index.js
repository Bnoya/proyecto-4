import{loadContact} from './processData.js';
loadContact();



async function getContacts(){
    let list = [];
    let url=`http://localhost:3000/contact`;
    try {
        const response= await fetch(url);
        const info = await response.json();
        console.log(url)
    } catch (error) {
        console.log(error);
    }
}

getContacts();


