const bcrypt = require('bcrypt');

class User {
    constructor(sequelize){
        this.sequelize = sequelize;
    }

//    async querryAll() {
//        const users = await this.sequelize.query('SELECT id, first_name, last_name, user_role FROM users', {type: this.sequelize.QueryTypes.SELECT});
//    return users;
//    }

    async querryById(userid) {
        const users = await this.sequelize.query('SELECT id, first_name, last_name, user_role FROM users WHERE id = :id', {
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

    async updateUserName(userdata){
        try{
            const query = await this.sequelize.query('UPDATE users SET first_name = :first_name WHERE id = :id', {
                replacements: {id: userdata.id, first_name: userdata.first_name },
                type: this.sequelize.QueryTypes.UPDATE
            })
            return {error: false, message: 'User First Name updated correctly'}

        } catch (err) {
            return {error: true, message: "Couldn't update User first name"}
        }
    };

    async updateLastName(userdata){
        try{
            const query = await this.sequelize.query('UPDATE users SET last_name = :last_name WHERE id = :id', {
                replacements: {id: userdata.id, last_name: userdata.last_name },
                type: this.sequelize.QueryTypes.UPDATE
            })
            return {error: false, message: 'User Last Name updated correctly'}

        } catch (err) {
            return {error: true, message: "Couldn't update User Last name"}
        }
    };

    async updateLastName(userdata){
        try{
            const query = await this.sequelize.query('UPDATE users SET last_name = :last_name WHERE id = :id', {
                replacements: {id: userdata.id, last_name: userdata.last_name },
                type: this.sequelize.QueryTypes.UPDATE
            })
            return {error: false, message: 'User Last Name updated correctly'}

        } catch (err) {
            return {error: true, message: "Couldn't update User Last name"}
        }
    };
    async updateUsername(userdata){
        try{
            const query = await this.sequelize.query('UPDATE users SET username = :username WHERE id = :id', {
                replacements: {id: userdata.id, username: userdata.username },
                type: this.sequelize.QueryTypes.UPDATE
            })
            return {error: false, message: 'Username updated correctly'}

        } catch (err) {
            return {error: true, message: "Couldn't update Username"}
        }
    };

    async deleteUser(userData){
        const query = `DELETE FROM users WHERE id = :id;`
        try{
            const queryed = await this.sequelize.query(query, {replacements: {id: userData.id}});
            if (queryed[0].affectedRows > 0) {
                return {status: 200, message: "User Deleted", data:{
                    user_id: userData.id
                }}
            } else {
                return ('')
            }
        } catch (err) {
            return ('')
        }
    }
};

module.exports = User;
