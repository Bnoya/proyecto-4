import{loadContact} from './processData.js';

getToken();
loadContact();


function getToken (){
    let token = localStorage.getItem('token');
    let tokens= JSON.parse(token);
    if (tokens ===null) {
        localStorage.setItem('token', JSON.stringify(['eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsInVzZXJuYW1lIjoiY3VzdDEiLCJwYXNzIjoiJDJiJDEwJDRLSWR6RGxXNXkxUWNMU2l5UHBrZi5BM01ZUzlUREJ3SGJiWGwwNHd1ZVExeVJUVVpLSGxhIiwiaWF0IjoxNjMzNzExNDU5fQ.g3QuJUBdAVjrr-0l78EhWu2Rz3jpaL8ijV5vZHSg1_A']));
        token= localStorage.getItem('token');
        tokens= JSON.parse(token);
    }
    return (tokens);
} 


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








