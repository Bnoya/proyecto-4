function getToken() {
    let token = localStorage.getItem('token')
    if (token == null){
        let token = sessionStorage.getItem('token');

        let Token= JSON.stringify(token);
        let fToken = Token.split('"', 3);
        let rToken = fToken[2];
        let ver = rToken.substring(0, rToken.length - 1);
        return ver
    }
    let Token= JSON.stringify(token);
    let fToken = Token.split('"', 3);
    let rToken = fToken[2];
    let ver = rToken.substring(0, rToken.length - 1);
    return ver
}

export{getToken};