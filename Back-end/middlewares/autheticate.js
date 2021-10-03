const authenticateUser = (req, res, next) => {
    const nonSecurePaths = ['/user/login', '/create-user'];
    if (nonSecurePaths.includes(req.path)) return next();
    
    const authHead = req.headers['authorization'];
    if (authHead) {
        const token = authHead.split(' ')[1];
        jwt.verify(token, SECRET_KEY, async (err, user) => {
            req.user = user;
            if(err){
                res.status(401).send({message: 'Invalid Token'})
            }
            next();
        })
    }else {
        res.status(401).send({message: 'No token provided'})
    }
}