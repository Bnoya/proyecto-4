class Contact {
    constructor(sequelize) {
        this.sequelize = sequelize;
    }

    async querryAll() {
        const contact = await this.sequelize.query('SELECT id, first_name, last_name, job_position, email, company_id, region_id, country_id, city_id, contact_address, interest FROM contact', {type: this.sequelize.QueryTypes.SELECT});
        return contact;
    }
    
    async querryById(id) {
            const contact = await this.sequelize.query('SELECT id, first_name, last_name, job_position, email, company_id, region_id, country_id, city_id, contact_address, interest FROM contact WHERE id = :id', {
                replacements: {id: id},
                type: this.sequelize.QueryTypes.SELECT});
            return contact;
    }
    async querryByName(id) {
        const contact = await this.sequelize.query('SELECT id, first_name, last_name, job_position, email, company_id, region_id, country_id, city_id, contact_address, interest FROM contact WHERE first_name = :first_name', {
            replacements: {first_name: id},
            type: this.sequelize.QueryTypes.SELECT});
        return contact;
    }
    async querryByLast(id) {
        const contact = await this.sequelize.query('SELECT id, first_name, last_name, job_position, email, company_id, region_id, country_id, city_id, contact_address, interest FROM contact WHERE last_name = :last_name', {
            replacements: {last_name: id},
            type: this.sequelize.QueryTypes.SELECT});
        return contact;
    }
    async querryByjob(id) {
        const contact = await this.sequelize.query('SELECT id, first_name, last_name, job_position, email, company_id, region_id, country_id, city_id, contact_address, interest FROM contact WHERE job_position = :job_position', {
            replacements: {job_position: id},
            type: this.sequelize.QueryTypes.SELECT});
        return contact;
    }
    async querryByEmail(id) {
        const contact = await this.sequelize.query('SELECT id, first_name, last_name, job_position, email, company_id, region_id, country_id, city_id, contact_address, interest FROM contact WHERE email = :email', {
            replacements: {email: id},
            type: this.sequelize.QueryTypes.SELECT});
        return contact;
    }
    async querryByCompany(id) {
        const contact = await this.sequelize.query('SELECT id, first_name, last_name, job_position, email, company_id, region_id, country_id, city_id, contact_address, interest FROM contact WHERE company_id = :company_id', {
            replacements: {company_id: id},
            type: this.sequelize.QueryTypes.SELECT});
        return contact;
    }
    async querryByRegion(id) {
        const contact = await this.sequelize.query('SELECT id, first_name, last_name, job_position, email, company_id, region_id, country_id, city_id, contact_address, interest FROM contact WHERE region_id = :region_id', {
            replacements: {region_id: id},
            type: this.sequelize.QueryTypes.SELECT});
        return contact;
    }
    async querryByCountry(id) {
        const contact = await this.sequelize.query('SELECT id, first_name, last_name, job_position, email, company_id, region_id, country_id, city_id, contact_address, interest FROM contact WHERE country_id = :country_id', {
            replacements: {country_id: id},
            type: this.sequelize.QueryTypes.SELECT});
        return contact;
    }
    async querryByCity(id) {
        const contact = await this.sequelize.query('SELECT id, first_name, last_name, job_position, email, company_id, region_id, country_id, city_id, contact_address, interest FROM contact WHERE city_id = :city_id', {
            replacements: {city_id: id},
            type: this.sequelize.QueryTypes.SELECT});
        return contact;
    }
    async querryByAddress(id) {
        const contact = await this.sequelize.query('SELECT id, first_name, last_name, job_position, email, company_id, region_id, country_id, city_id, contact_address, interest FROM contact WHERE contact_address = :contact_address', {
            replacements: {contact_address: id},
            type: this.sequelize.QueryTypes.SELECT});
        return contact;
    }
    async querryByInterest(id) {
        const contact = await this.sequelize.query('SELECT id, first_name, last_name, job_position, email, company_id, region_id, country_id, city_id, contact_address, interest FROM contact WHERE interest = :interest', {
            replacements: {interest: id},
            type: this.sequelize.QueryTypes.SELECT});
        return contact;
    }

    async createContact(contactData) {
        console.log('entre a la create Contact');
        try {
            const querry = await this.sequelize.query('INSERT INTO contact(first_name, last_name, job_position, email, company_id, region_id, country_id, city_id, contact_address, interest) VALUES (:first_name, :last_name, :job_position, :email, :company_id, :region_id, :country_id, :city_id, :contact_address, interest)', 
            {
                replacements: { first_name: contactData.first_name, last_name: contactData.last_name, job_position: contactData.job_position, email: contactData.email, company_id: contactData.company_id, region_id: contactData.region_id, country_id: contactData.country_id, city_id: contactData.city_id, contact_address: contactData.contact_address, interest: contactData.interest},
                type: this.sequelize.QueryTypes.INSERT
            })
            return {message: 'Contact Uploaded', data: {
                ...contactData, id: querry[0]
            }}
        } catch (err) {
            return {message: err.errors[0].message}
        }
    }

    async deleteContact(contact) {
        const query = `DELETE FROM contact WHERE id = :id;`
        try {
            const queryed = await this.sequelize.query(query, {
                    replacements: {id: contact.id},
                    type: this.sequelize.QueryTypes.DELETE
                })
            
            if (queryed[0].affectedRows > 0) {
                return {status: 200, message: "Contact Deleted", data: {
                    contact_id: contactId
                }}
            } else {
                return {error: true, message: "couldn't delete."}
            }
        } catch (error) {
            return {error: true, message: "couldn't delete Contact."}
        }
    }
    
    async updateContact(contact){
        try {
            const query = await this.sequelize.query("UPDATE contact SET first_name= :first_name, last_name= :last_name, job_position= :job_position, email= :email, company_id= :company_id, region_id= :region_id, country_id= :country_id, city_id= :city_id, contact_address= :contact_address, interest= :interest WHERE id = :id", 
            {
                replacements: { id: contactId,
                    first_name: contact.first_name,
                    last_name: contact.last_name,
                    job_position: contact.job_position,
                    email: contact.email,
                    company_id: contact.company_id,
                    region_id: contact.region_id,
                    country_id: contact.country_id,
                    city_id: contact.city_id,
                    contact_address: contact.contact_address,
                    interest: contact.interest},
                type: this.sequelize.QueryTypes.UPDATE
            })
            return {error: false, message: "Contact updated correctly"}
        } catch (err) {
            return {error: true, message: "Couldn't update contact"}
        }
    }
}


module.exports = Contact