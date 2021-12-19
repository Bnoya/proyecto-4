const bcrypt = require('bcrypt');

class User {
    constructor(sequelize){
        this.sequelize = sequelize;
    }

    async querryAll() {
        const users = await this.sequelize.query('SELECT id, first_name, last_name, email, username FROM users ORDER BY username', {type: this.sequelize.QueryTypes.SELECT});
    return users;
    }
    async querryAllUsernames() {
        const users = await this.sequelize.query('SELECT id, username FROM users', {type: this.sequelize.QueryTypes.SELECT});
    return users;
    }

    async querryById(userid) {
        const users = await this.sequelize.query('SELECT id, first_name, last_name, user_role, email, username FROM users WHERE id = :id', {
            replacements: {id: userid},
            type: this.sequelize.QueryTypes.SELECT});
    return users;
    }

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
        console.log('entre a newUser');
        const salt = await bcrypt.genSalt(10);
        // now we set user password to hashed password
        
        const hashedPassword = await bcrypt.hash(userData.pass, salt);
        const query = ` INSERT INTO users (first_name, last_name, user_role, pass, username, Email) VALUES (:first_name, :last_name, :user_role, :pass, :username, :Email);`
        try {            
            const queryed = await this.sequelize.query(
                query,
                {
                    replacements: { 
                        first_name: userData.first_name, 
                        last_name: userData.last_name, 
                        user_role:  0, 
                        pass: hashedPassword, 
                        username: userData.username, 
                        Email: userData.Email},
                    type: this.sequelize.QueryTypes.INSERT
                })
            return queryed;
        } catch (error) {
            return false
        }
    }

    async deleteUser(id){
        const query = `DELETE FROM users WHERE id = :id;`
        try{
            const queryed = await this.sequelize.query(query, {replacements: {id: id}});
            if (queryed[0].affectedRows > 0) {
                return {status: 200, message: "User Deleted", data:{
                    user_id: id
                }}
            } else {
                return ('')
            }
        } catch (err) {
            return ('')
        }
    }

    async updateUser(user){
        let query;
        const salt = await bcrypt.genSalt(10);
        
        const hashedPassword = await bcrypt.hash(user.pass, salt);
        try{
            query = await this.sequelize.query('UPDATE users SET first_name = :first_name, last_name = :last_name, pass = :pass, username = :username, email = :email  WHERE id = :id',
            {
                replacements: {
                    first_name: user.first_name,
                    last_name: user.last_name,
                    pass: hashedPassword,
                    username: user.username,
                    email: user.email,
                    id: user.id},
                type: this.sequelize.QueryTypes.UPDATE
            })
            return{message: 'user Updated'}
        }catch{
            return{message: 'user Not Updated'}
        }
    }
};

module.exports = User;
