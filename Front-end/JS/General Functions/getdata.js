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
    //console.log(check);
    if (check == '[0]') {
        let user = document.getElementById('usersBt');
        //console.log(user);
        user.style.display = 'none';
    }
}

const getContactAvatar = async (contactId) =>  {
    let url = `http://localhost:3000/public/avatars/contact-${contactId}.jpeg`;
    let rToken = getToken();
    let ver = rToken.substring(0, rToken.length - 1);
    try {
        const response = await fetch(url , {
            headers: { 'Authorization': `Bearer ${ver}`, },
        });
        if (response.status === 200) {
            const imageBlob = await response.blob();
            return URL.createObjectURL(imageBlob);
        } else {
            return '/Front-end/img/user-solid.svg';
        }
    } catch (e) {
        console.log(e)
        return '/Front-end/img/user-solid.svg';
    }
}
export{getToken, isAdmin, getContactAvatar};