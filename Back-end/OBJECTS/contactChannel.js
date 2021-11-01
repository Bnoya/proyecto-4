class ContactChannel {
    constructor(sequelize) {
        this.sequelize = sequelize;
    }
    async querryAll() {
        console.log('entre a querry all')
        const contactChannel = await this.sequelize.query('SELECT id, contact_id, contact_channel_type_id, socials_username, preferences FROM contact_channel', {type: this.sequelize.QueryTypes.SELECT});
        console.log('fui a la tabla')
        return contactChannel;
    }
    
    async querryById(contact_id) {
            const contactChannel = await this.sequelize.query('SELECT id, contact_id, contact_channel_type_id, socials_username, preferences FROM contact_channel WHERE contact_id = :contact_id', {
                replacements: {contact_id: contact_id},
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
}

module.exports = ContactChannel