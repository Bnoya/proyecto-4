

let submit = document.getElementById('submit');

submit.addEventListener('click', async (e) => {
    e.preventDefault();
    let user = document.getElementById('username');
    let password = document.getElementById('password');
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
        let check = document.getElementById('rememberMe');
        let token = datas.token;
        if (check== true){
            setPremToken(token)
        } else {
            setToken(token);
        }
        console.log(token)
        if (token == null) {
            alert('Usuario o Contrasenia Incorrectas')
        }else {
            window.location.href = '/Front-end/index.html';
        }
    } catch (error) {
        console.log(error);
    }

});

function setToken(token) {
    let access = [];
    access.push(token);
    sessionStorage.setItem('token', JSON.stringify((access)));
    console.log('se guardo el token');
};
function setPremToken(token) {
    let access = [];
    access.push(token);
    localStorage.setItem('token', JSON.stringify((access)));
}
