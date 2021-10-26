

let submit = document.getElementById('submit');

submit.addEventListener('click', async (e) => {
    e.preventDefault();
    let user = document.getElementById('username');
    let password = document.getElementById('password');
    console.log(user.value);
    console.log(password.value);

    let url = 'http://localhost:3000/user/login';
    const data = {
        'username': user.value,
        'pass': password.value
    }
    let options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    };
    try {
        const response = await fetch(url, options);
        let datas = await response.json();
        console.log(datas);
        
    } catch (error) {
        console.log(error);
    }

    sessionStorage.setItem('token', JSON.stringify(datas.token));
});