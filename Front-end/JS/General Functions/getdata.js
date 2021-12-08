function getToken() {
    let token = localStorage.getItem('token')
    if (token == null){
        let token = sessionStorage.getItem('token');

        let Token= JSON.stringify(token);
        let fToken = Token.split('"', 3);
        let rToken = fToken[2];
        return rToken
    }
    let Token= JSON.stringify(token);
    let fToken = Token.split('"', 3);
    let rToken = fToken[2];
    return rToken
}
function isAdmin () {
    let role = localStorage.getItem('role');
    let check ;
    if (role == null) {
        let role2 = sessionStorage.getItem('role');
        let Rrole2 = JSON.stringify(role2);
        let Trole2 = Rrole2.split('"', 2);
        let Frole2 = Trole2[1];
        check = Frole2
        
    } else{
        let Rrole = JSON.stringify(role);
        let Trole = Rrole.split('"', 2);
        let Frole = Trole[1];
        check = Frole;
        
    }
    console.log(check);
    if (check == '[0]') {
        let user = document.getElementById('usersBt');
        console.log(user);
        user.style.display = 'none';
    }
}
export{getToken, isAdmin};