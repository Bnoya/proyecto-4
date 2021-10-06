const bcrypt = require('bcrypt');

class User {
    constructor(sequelize){
        this.sequelize = sequelize;
    }

//    async querryAll() {
//        const users = await this.sequelize.query('SELECT id, first_name, last_name, user_role FROM Users', {type: this.sequelize.QueryTypes.SELECT});
//    return users;
//    }

//    async querryById(id) {
//        const users = await this.sequelize.query('SELECT id, first_name, last_name, user_role FROM Users', {replacement: {id: id} ,type: this.sequelize.QueryTypes.SELECT});
//    return users;
//    }

    async loginUser(username, pass) {
        const user = await this.sequelize.query("SELECT id, user_role, pass, username FROM users where username = :username", { replacements: { username: username, pass: pass}, type: this.sequelize.QueryTypes.SELECT })
        if (user.length != 0) {
            
            const validPassword = await bcrypt.compare(pass, user[0].pass);
            if(validPassword){
                let loggedUser = user[0]
                loggedUser.loginSuccess = true
                return loggedUser
            } else {
                return { loginSuccess: false }
            }
        } else {
            return { loginSucess: false }
        }
    };

    async authenticateUser(username, pass) {
        const user = await this.sequelize.query('SELECT id, username, pass FROM users WHERE username = :username', {replacements: {username: username, pass: pass}, type: this.sequelize.QueryTypes.SELECT});

        if (user.length != 0) {
            return user
        } else{
            return null
        }
    }

    async newUser(userData) {
        // generate salt to hash password
        const salt = await bcrypt.genSalt(10);
        // now we set user password to hashed password
        console.log(userData.pass)
        
        const hashedPassword = await bcrypt.hash(userData.pass, salt);
        const query = `
        INSERT INTO users (first_name, last_name, user_role, pass, username)
        VALUES (:first_name, :last_name, :user_role, :pass, :username);`
        try {            
            const queryed = await this.sequelize.query(
                query,
                {
                    replacements: { first_name: userData.first_name, last_name: userData.last_name, user_role:  userData.user_role, pass: hashedPassword, username: userData.username },
                    type: this.sequelize.QueryTypes.INSERT
                })
            return queryed;
        } catch (error) {
            return false
        }
    }
};

module.exports = User;
