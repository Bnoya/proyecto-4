

let submit = document.getElementById('submit');

submit.addEventListener('click', async (e) => {
    e.preventDefault();
    let user = document.getElementById('username');
    let password = document.getElementById('password');
    console.log(user.value);
    console.log(password.value);



    let url = 'http://localhost:3000/user/login';

    const response = await fetch(url, {
    method: 'POST',
    headers: {
    'Content-Type': 'application/json'
    },
    body: JSON.stringify({
    username : user,
    pass : password,
    })
    
});
let data = response.json();
console.log(data)
});