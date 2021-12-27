class ContactChannel {
    constructor(sequelize) {
        this.sequelize = sequelize;
    }
    async querryAll() {
        const contactChannel = await this.sequelize.query('SELECT id, contact_id, contact_channel_type_id, socials_username, preferences FROM contact_channel', {type: this.sequelize.QueryTypes.SELECT});
        return contactChannel;
    }
    
    async querryById(contact_id) {
        console.log(contact_id);
            const contactChannel = await this.sequelize.query('SELECT id, contact_id, contact_channel_type_id, socials_username, preferences FROM contact_channel WHERE contact_id = :id', {
                replacements: {id: contact_id},
                type: this.sequelize.QueryTypes.SELECT});
            return contactChannel;
    }

    async createContactChannel(channel) {
        try {
            const querry = await this.sequelize.query('INSERT INTO contact_channel (contact_id, contact_channel_type_id, socials_username, preferences) VALUES (:contact_id, :contact_channel_type_id, :socials_username, :preferences)', 
            {
                replacements: { contact_id: channel.contact_id, contact_channel_type_id: channel.contact_channel_type_id, socials_username: channel.socials_username, preferences: channel.preferences},
                type: this.sequelize.QueryTypes.INSERT
            })
            return {message: 'Contact Uploaded', data: {
                ...channel, id: querry[0]
            }}
        } catch (err) {
            return {message: err.errors[0].message}
        }
    }
    async updateContactChannel(contact){
        try {
            const query = await this.sequelize.query("UPDATE contact_channel SET contact_id= :contact_id, contact_channel_type_id= :contact_channel_type_id, socials_username= :socials_username, preferences= :preferences WHERE id = :id", 
            {
                replacements: { id: contact.id,
                    contact_id: contact.contact_id,
                    contact_channel_type_id: contact.contact_channel_type_id,
                    socials_username: contact.socials_username,
                    preferences: contact.preferences,},
                type: this.sequelize.QueryTypes.UPDATE
            })
            return {error: false, message: "Contact Channel updated correctly"}
        } catch (err) {
            return {error: true, message: "Couldn't update contact channel"}
        }
    }
    async deleteContactChannel(Id) {
        const query = `DELETE FROM contact_channel WHERE id = :id;`
        try {
            const queryed = await this.sequelize.query(query, {
                    replacements: {id: Id},
                    type: this.sequelize.QueryTypes.DELETE
                })
            
            if (queryed[0].affectedRows > 0) {
                return {status: 200, message: "Contact channel Deleted", data: {
                    contact_id: Id
                }}
            } else {
                return {error: true, message: "couldn't delete channel."}
            }
        } catch (error) {
            return {error: true, message: "couldn't delete Contact channel."}
        }
    }
    
}

module.exports = ContactChannel