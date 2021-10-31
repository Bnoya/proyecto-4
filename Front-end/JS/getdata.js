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

export{getToken};