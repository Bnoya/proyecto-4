class ChannelType {
    constructor(sequelize) {
        this.sequelize = sequelize;
    }
    async querryAll() {
        const ChannelType = await this.sequelize.query('SELECT id, channel FROM contact_channel_type', {type: this.sequelize.QueryTypes.SELECT});
        return ChannelType;
    }
    async createChannelType(channel) {
        try {
            const querry = await this.sequelize.query('INSERT INTO contact_channel_type (channel) VALUES (:channel)', 
            {
                replacements: { channel: channel.channel},
                type: this.sequelize.QueryTypes.INSERT
            })
            return {message: 'Channel Uploaded', data: {
                ...channel, id: querry[0]
            }}
        } catch (err) {
            return {message: err.errors[0].message}
        }
    }
    async updateChannel(channel) {
        let query;
        try{
            query = await this.sequelize.query('UPDATE contact_channel_type SET channel = :channel WHERE id = :id',
            {
                replacements: {
                    channel: channel.channel,
                    id: channel.id},
                type: this.sequelize.QueryTypes.UPDATE
            })
        }catch{
            return{message: 'Channel Updated'}
        }
    }
}

module.exports = ChannelType