class Contacts {
    constructor(sequelize) {
        this.sequelize = sequelize;
    }

    querryAll(){
        const contact = await this.sequelize.query('SELECT id, first_name, last_name, job_position, email, company_id, region_id, country_id, city_id, contact_address, intrest FROM contact', {type: this.sequelize.QueryTypes.SELECT});
        return contact;
    }
    querryByName(contacts){
        const contact = await this.sequelize.query('SELECT id, first_name, last_name, job_position, email, company_id, region_id, country_id, city_id, contact_address, intrest FROM contact', { replacements: {first_name: contacts.first_name}, type: this.sequelize.QueryTypes.SELECT});
        return contact;
    }
    querryByLastName(contacts){
        const contact = await this.sequelize.query('SELECT id, first_name, last_name, job_position, email, company_id, region_id, country_id, city_id, contact_address, intrest FROM contact', { replacements: {last_name: contacts.last_name}, type: this.sequelize.QueryTypes.SELECT});
        return contact;
    }
    querryByCompany(contacts){
        const contact = await this.sequelize.query('SELECT id, first_name, last_name, job_position, email, company_id, region_id, country_id, city_id, contact_address, intrest FROM contact', { replacements: {company_id: contacts.company_id}, type: this.sequelize.QueryTypes.SELECT});
        return contact;
    }
    querryByRegion(contacts){
        const contact = await this.sequelize.query('SELECT id, first_name, last_name, job_position, email, company_id, region_id, country_id, city_id, contact_address, intrest FROM contact', { replacements: {region_id: contacts.region_id}, type: this.sequelize.QueryTypes.SELECT});
        return contact;
    }
    querryByCountry(contacts){
        const contact = await this.sequelize.query('SELECT id, first_name, last_name, job_position, email, company_id, region_id, country_id, city_id, contact_address, intrest FROM contact', { replacements: {country_id: contacts.country_id}, type: this.sequelize.QueryTypes.SELECT});
        return contact;
    }
    querryByCity(contacts){
        const contact = await this.sequelize.query('SELECT id, first_name, last_name, job_position, email, company_id, region_id, country_id, city_id, contact_address, intrest FROM contact', { replacements: {city_id: contacts.city_id}, type: this.sequelize.QueryTypes.SELECT});
        return contact;
    }

    createContact(contacts){
        let query;
        try {
            query = await this.sequelize.query("INSERT INTO contact (first_name, last_name, job_position, email, company_id, region_id, country_id, city_id, contact_address, intrest) VALUES (:first_name, :last_name, :job_position, :email, :company_id, :region_id, :country_id, :city_id, :contact_address, :intrest)", 
            {
                replacements: { first_name: contacts.first_name, last_name: contacts.last_name, job_position: contacts.job_position, email: contacts.email, company_id: contacts.company_id, region_id: contacts.region_id, country_id: contacts.country_id, city_id: contacts.city_id, contact_address: contacts.contact_address, intrest: contacts.intrest},
                type: this.sequelize.QueryTypes.INSERT
            })
            return {message: 'Contacts Uploaded'}
        } catch (err) {
            return {message: err.errors[0].message}
        }
    }
    
    deleteContact(){

    }
}
module.exports = Contacts;