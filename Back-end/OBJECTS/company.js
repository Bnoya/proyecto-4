class Company {
    constructor(sequelize) {
        this.sequelize = sequelize;
    }

    async querryAll() {
        const company = await this.sequelize.query('SELECT id, city_id, company_name, company_address, phone FROM company ORDER BY company_name', {type: this.sequelize.QueryTypes.SELECT});
        return company;
    }
    
    async querryById(compid) {
            const company = await this.sequelize.query('SELECT id, city_id, company_name, company_address, phone FROM company WHERE id = :id', {
                replacements: {id: compid},
                type: this.sequelize.QueryTypes.SELECT});
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

    async deleteCompany(id) {
        let query;
        try{
            query = await this.sequelize.query("DELETE FROM company WHERE id= :id", 
            {
                replacements: {id: id},
                type: this.sequelize.QueryTypes.DELETE
            })
            return{message: 'Company Deleted'}
        } catch(err) {
            return{message: 'Company Not Deleted Contact Dependent on Company, delete Contact first '}
        }
    }
    
    async updateCompany(company) {
        let query;
        try{
            query = await this.sequelize.query('UPDATE company SET city_id = :city_id, company_name = :company_name, company_address = :company_address, phone = :phone WHERE id = :id',
            {
                replacements: {
                    city_id: company.city_id,
                    company_name: company.company_name,
                    company_address: company.company_address,
                    phone: company.phone,
                    id: company.id},
                type: this.sequelize.QueryTypes.UPDATE
            })
        }catch{
            return{message: 'Company Updated'}
        }
    }
    
}
module.exports = Company