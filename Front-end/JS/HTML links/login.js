

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
        let role = datas.userRole;
        if (check== true){
            setPremToken(token, role)
        } else {
            setToken(token, role);
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

function setToken(token, role) {
    let access = [];
    let capable = [];
    access.push(token);
    capable.push(role);
    sessionStorage.setItem('token', JSON.stringify((access)));
    sessionStorage.setItem('role', JSON.stringify((capable)));
};
function setPremToken(token, role) {
    let access = [];
    let capable = [];
    access.push(token);
    capable.push(role);
    localStorage.setItem('token', JSON.stringify((access)));
    localStorage.setItem('role', JSON.stringify((capable)));
}
