class Company {
    constructor(sequelize) {
        this.sequelize = sequelize;
    }

    async querryAll() {
        const company = await this.sequelize.query('SELECT id, city_id, company_name, company_address, phone FROM company', {type: this.sequelize.QueryTypes.SELECT});
        return company;
    }
    
    async querryById(compid) {
            const company = await this.sequelize.query('SELECT id, city_id, company_name, company_address, phone FROM company', {replacement: {id: compid} ,type: this.sequelize.QueryTypes.SELECT});
            return company;
    }

    async createCompany(company) {
        let query;
        try {
            query = await this.sequelize.query("INSERT INTO company (city_id, company_name, company_address, phone) VALUES (:city_id, :company_name, :company_address, :phone)", 
            {
                replacements: { city_id: company.city_id, company_name: company.company_name, company_address: company.company_address, phone: company.phone},
                type: this.sequelize.QueryTypes.INSERT
            })
            return {message: 'Company Uploaded'}
        } catch (err) {
            return {message: err.errors[0].message}
        }
    }

    
}
module.exports = Company