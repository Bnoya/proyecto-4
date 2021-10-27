function getToken() {
    let token = localStorage.getItem('token')
    if (token == null){
        let token = sessionStorage.getItem('token');
        return token
    }
    return token
}

export{getToken};