class Location {
    constructor(sequelize) {
        this.sequelize = sequelize;
    }

    async querryAllRegions() {
        const location = await this.sequelize.query('SELECT id, region_name FROM region', {type: this.sequelize.QueryTypes.SELECT});
        return location;
    }
    async querryAllCountries() {
        const location = await this.sequelize.query('SELECT id, redion_id, country_name FROM country', {type: this.sequelize.QueryTypes.SELECT});
        return location;
    }

    async querryCountryByRegion(country) {
        const location = await this.sequelize.query('SELECT id, redion_id, country_name FROM country', {replacements: {redion_id: country.redion_id}  ,type: this.sequelize.QueryTypes.SELECT});
        return location;
    }

    async querryAllCities() {
        const location = await this.sequelize.query('SELECT id, country_id, city_name FROM city', {type: this.sequelize.QueryTypes.SELECT});
        return location;
    }

    async querryCitiesByCountry(city) {
        const location = await this.sequelize.query('SELECT id, country_id, city_name FROM city', {replacements: {country_id: city.country_id}  ,type: this.sequelize.QueryTypes.SELECT});
        return location;
    }

    async createRegion(region) {
        let query;
        try {
            query = await this.sequelize.query("INSERT INTO region (region_name) VALUES (:region_name)", 
            {
                replacements: { region_name: region.region_name},
                type: this.sequelize.QueryTypes.INSERT
            })
            return {message: 'Region Uploaded'}
        } catch (err) {
            return {message: err.errors[0].message}
        }
    }

    async createCountry(country) {
        let query;
        try {
            query = await this.sequelize.query("INSERT INTO country (redion_id, country_name) VALUES (:redion_id, :country_name)", 
            {
                replacements: { redion_id: country.redion_id, country_name: country.country_name},
                type: this.sequelize.QueryTypes.INSERT
            })
            return {message: 'Country Uploaded'}
        } catch (err) {
            return {message: err.errors[0].message}
        }
    }

    async createCity(city) {
        let query;
        try {
            query = await this.sequelize.query("INSERT INTO city (country_id, city_name) VALUES (:country_id, :city_name)", 
            {
                replacements: { country_id: city.country_id, city_name: city.city_name},
                type: this.sequelize.QueryTypes.INSERT
            })
            return {message: 'City Uploaded'}
        } catch (err) {
            return {message: err.errors[0].message}
        }
    }
}
module.exports = Location;