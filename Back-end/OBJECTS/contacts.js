class Contact {
    constructor(sequelize) {
        this.sequelize = sequelize;
    }

    async querryAll(id, noptions) {
        const contact = await this.sequelize.query('SELECT id, first_name, last_name, job_position, email, company_id, region_id, country_id, city_id, contact_address, interest FROM contact ORDER BY first_name', {type: this.sequelize.QueryTypes.SELECT});
        let n_options = noptions;
        let sup_limit = id*n_options;
        let inf_limit = (id-1)*n_options;
        console.log(id);
        console.log(sup_limit);
        console.log(inf_limit);
        console.log(n_options);
        if (contact.length > n_options) {
            let first_page= [];
            if (id > 1) {
                for (let i = inf_limit; i < sup_limit; i++) {
                    first_page.push(contact[i]);
                }
            }else{
                for (let i = 0; i < n_options; i++) {
                    first_page.push(contact[i]);
                }
                first_page.unshift(contact.length);
            }
            return first_page;
        }else{
            return contact;
        }
    }
    
    async querryAllByJob() {
        const contact = await this.sequelize.query('SELECT id, first_name, last_name, job_position, email, company_id, region_id, country_id, city_id, contact_address, interest FROM contact ORDER BY job_position', {type: this.sequelize.QueryTypes.SELECT});
        return contact;
    }
    async querryAllByInterest() {
        const contact = await this.sequelize.query('SELECT id, first_name, last_name, job_position, email, company_id, region_id, country_id, city_id, contact_address, interest FROM contact ORDER BY interest', {type: this.sequelize.QueryTypes.SELECT});
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
    async querryByEmail(id) {
        const contact = await this.sequelize.query('SELECT id, first_name, last_name, job_position, email, company_id, region_id, country_id, city_id, contact_address, interest FROM contact WHERE email = :email', {
            replacements: {email: id},
            type: this.sequelize.QueryTypes.SELECT});
        return contact;
    }

    async createContact(contactData) {
        console.log(contactData);
        try {
            const querry = await this.sequelize.query('INSERT INTO contact(first_name, last_name, job_position, email, company_id, region_id, country_id, city_id, contact_address, interest) VALUES (:first_name, :last_name, :job_position, :email, :company_id, :region_id, :country_id, :city_id, :contact_address, :interest)', 
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
                replacements: { id: contact.id,
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
    async ContactAutoCompleteOne(contacts) {
        contacts = contacts+ '%';
        const query = `SELECT id, first_name, last_name, job_position, email, company_id, region_id, country_id, city_id, contact_address, interest FROM contact WHERE first_name LIKE :contact ORDER BY first_name`;
        const contact = await this.sequelize.query(query, {
            replacements: {
                contact: contacts,
                },
            type: this.sequelize.QueryTypes.SELECT});
        return contact;
    }
    async ContactAutoCompleteTwo(contacts) {
        contacts = contacts+ '%'
        const query = `SELECT id, first_name, last_name, job_position, email, company_id, region_id, country_id, city_id, contact_address, interest FROM contact WHERE last_name LIKE :contact ORDER BY first_name`;
        const contact = await this.sequelize.query(query, {
            replacements: { 
                contact: contacts,
                },
            type: this.sequelize.QueryTypes.SELECT});
        return contact;
    }
    async ContactAutoCompleteThree(contacts) {
        contacts = contacts+ '%'
        const query = `SELECT id, first_name, last_name, job_position, email, company_id, region_id, country_id, city_id, contact_address, interest FROM contact WHERE job_position LIKE :contact ORDER BY first_name`;
        const contact = await this.sequelize.query(query, {
            replacements: {
                contact: contacts,},
            type: this.sequelize.QueryTypes.SELECT});
        return contact;
    }
    async ContactAutoCompleteFour(contacts) {
        contacts = contacts+ '%'
        const query = `SELECT id, first_name, last_name, job_position, email, company_id, region_id, country_id, city_id, contact_address, interest FROM contact WHERE email LIKE :contact ORDER BY first_name`;
        const contact = await this.sequelize.query(query, {
            replacements: {
                contact: contacts,},
            type: this.sequelize.QueryTypes.SELECT});
        return contact;
    }
    async ContactAutoCompleteFive(contacts) {
        contacts = contacts+ '%'
        const query = `SELECT id, first_name, last_name, job_position, email, company_id, region_id, country_id, city_id, contact_address, interest FROM contact WHERE interest LIKE :contact ORDER BY first_name`;
        const contact = await this.sequelize.query(query, {
            replacements: {
                contact: contacts,},
            type: this.sequelize.QueryTypes.SELECT});
        return contact;
    }

    async ContactSearchOne(contacts) {
        contacts = contacts+ '%';
        const query = `
        SELECT contact.id, contact.first_name, contact.last_name, contact.job_position, contact.email, company.company_name, region.region_name, country.country_name, city.city_name, contact.contact_address, contact.interest
        FROM contact
        LEFT JOIN region ON contact.region_id = region.id
        LEFT JOIN country ON contact.country_id = country.id
        LEFT JOIN city ON contact.city_id = city.id
        LEFT JOIN company ON contact.company_id = company.id
        WHERE contact.first_name LIKE :contact
        OR contact.last_name LIKE :contact
        ORDER BY contact.first_name
        `

        const contact = await this.sequelize.query(query, {
            replacements: {
                contact: contacts,},
            type: this.sequelize.QueryTypes.SELECT});
        return contact;
    }
    async ContactSearchTwo(contacts) {
        contacts = contacts+ '%';
        const query = `
        SELECT contact.id, contact.first_name, contact.last_name, contact.job_position, contact.email, company.company_name, region.region_name, country.country_name, city.city_name, contact.contact_address, contact.interest
        FROM contact
        LEFT JOIN region ON contact.region_id = region.id
        LEFT JOIN country ON contact.country_id = country.id
        LEFT JOIN city ON contact.city_id = city.id
        LEFT JOIN company ON contact.company_id = company.id
        WHERE contact.job_position LIKE :contact
        OR contact.email LIKE :contact
        ORDER BY contact.first_name
        `

        const contact = await this.sequelize.query(query, {
            replacements: {
                contact: contacts,},
            type: this.sequelize.QueryTypes.SELECT});
        return contact;
    }
    async ContactSearchThree(contacts) {
        contacts = contacts+ '%';
        const query = `
        SELECT contact.id, contact.first_name, contact.last_name, contact.job_position, contact.email, company.company_name, region.region_name, country.country_name, city.city_name, contact.contact_address, contact.interest
        FROM contact
        LEFT JOIN region ON contact.region_id = region.id
        LEFT JOIN country ON contact.country_id = country.id
        LEFT JOIN city ON contact.city_id = city.id
        LEFT JOIN company ON contact.company_id = company.id
        WHERE company.company_name LIKE :contact
        ORDER BY contact.first_name
        `

        const contact = await this.sequelize.query(query, {
            replacements: {
                contact: contacts,},
            type: this.sequelize.QueryTypes.SELECT});
        return contact;
    }
    async ContactSearchFour(contacts) {
        contacts = contacts+ '%';
        const query = `
        SELECT contact.id, contact.first_name, contact.last_name, contact.job_position, contact.email, company.company_name, region.region_name, country.country_name, city.city_name, contact.contact_address, contact.interest
        FROM contact
        LEFT JOIN region ON contact.region_id = region.id
        LEFT JOIN country ON contact.country_id = country.id
        LEFT JOIN city ON contact.city_id = city.id
        LEFT JOIN company ON contact.company_id = company.id
        WHERE region.region_name LIKE :contact
        OR country.country_name LIKE :contact
        OR city.city_name LIKE :contact
        ORDER BY contact.first_name
        `

        const contact = await this.sequelize.query(query, {
            replacements: {
                contact: contacts,},
            type: this.sequelize.QueryTypes.SELECT});
        return contact;
    }
    async ContactSearchFive(contacts) {
        contacts = contacts+ '%';
        const query = `
        SELECT contact.id, contact.first_name, contact.last_name, contact.job_position, contact.email, company.company_name, region.region_name, country.country_name, city.city_name, contact.contact_address, contact.interest
        FROM contact
        LEFT JOIN region ON contact.region_id = region.id
        LEFT JOIN country ON contact.country_id = country.id
        LEFT JOIN city ON contact.city_id = city.id
        LEFT JOIN company ON contact.company_id = company.id
        WHERE contact.contact_address LIKE :contact
        OR contact.interest LIKE :contact
        ORDER BY contact.first_name
        `

        const contact = await this.sequelize.query(query, {
            replacements: {
                contact: contacts,},
            type: this.sequelize.QueryTypes.SELECT});
        return contact;
    }
    async ContactSearch(contacts) {
        contacts = contacts+ '%';
        const query = `
        SELECT contact.id, contact.first_name, contact.last_name, contact.job_position, contact.email, company.company_name, region.region_name, country.country_name, city.city_name, contact.contact_address, contact.interest
        FROM contact
        LEFT JOIN region ON contact.region_id = region.id
        LEFT JOIN country ON contact.country_id = country.id
        LEFT JOIN city ON contact.city_id = city.id
        LEFT JOIN company ON contact.company_id = company.id
        WHERE contact.first_name LIKE :contact
        OR contact.last_name LIKE :contact
        OR contact.job_position LIKE :contact
        OR contact.email LIKE :contact
        OR company.company_name LIKE :contact
        OR region.region_name LIKE :contact
        OR country.country_name LIKE :contact
        OR city.city_name LIKE :contact
        OR contact.contact_address LIKE :contact
        OR contact.interest LIKE :contact
        ORDER BY contact.first_name
        `

        const contact = await this.sequelize.query(query, {
            replacements: {
                contact: contacts,},
            type: this.sequelize.QueryTypes.SELECT});
        return contact;
    }

}


module.exports = Contact