class Location {
    constructor(sequelize) {
        this.sequelize = sequelize;
    }

    async querryAllRegions() {
        const location = await this.sequelize.query('SELECT id, region_name FROM region', {type: this.sequelize.QueryTypes.SELECT});
        return location;
    }
    async querryRegionsById(id) {
        const location = await this.sequelize.query('SELECT id, region_name FROM region WHERE id = :id', {
            replacements: {id: id},
            type: this.sequelize.QueryTypes.SELECT});
        return location;
    }
    async querryAllCountries() {
        const location = await this.sequelize.query('SELECT id, redion_id, country_name FROM country', {type: this.sequelize.QueryTypes.SELECT});
        return location;
    }
    async querryCountryById(id) {
        const location = await this.sequelize.query('SELECT id, redion_id, country_name FROM country WHERE id = :id', {
            replacements: {id: id},
            type: this.sequelize.QueryTypes.SELECT});
        return location;
    }

    async querryCountryByRegion(id) {
        const location = await this.sequelize.query('SELECT id, redion_id, country_name FROM country WHERE redion_id = :redion_id', {
            replacements: {redion_id: id},
            type: this.sequelize.QueryTypes.SELECT});
        return location;
    }

    async querryAllCities() {
        const location = await this.sequelize.query('SELECT id, country_id, city_name FROM city', {type: this.sequelize.QueryTypes.SELECT});
        return location;
    }
    async querryCityById(id) {
        const location = await this.sequelize.query('SELECT id, country_id, city_name FROM city WHERE id = :id', {
            replacements: {id: id},
            type: this.sequelize.QueryTypes.SELECT});
        return location;
    }

    async querryCitiesByCountry(id) {
        const location = await this.sequelize.query('SELECT id, country_id, city_name FROM city WHERE country_id = :country_id', {replacements: {country_id: id}  ,type: this.sequelize.QueryTypes.SELECT});
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

    async deleteRegion(id) {
        let query;
        try{
            query = await this.sequelize.query("DELETE FROM region WHERE id= :id", 
            {
                replacements: {id: id},
                type: this.sequelize.QueryTypes.DELETE
            })
            return{message: 'Region Deleted'}
        } catch(err) {
            return{message: 'Region Not Deleted'}
        }
    }

    async updateRegion(region){
        let query;
        try{
            query = await this.sequelize.query('UPDATE region SET region_name = :region_name WHERE id = :id',
            {
                replacements: {
                    region_name: region.region_name,
                    id: region.id},
                type: this.sequelize.QueryTypes.UPDATE
            })
            return{message: 'Region Updated'}
        }catch{
            return{message: 'Region Not Updated'}
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

    async deleteCountry(id) {
        let query;
        try{
            query = await this.sequelize.query("DELETE FROM country WHERE id= :id", 
            {
                replacements: {id: id},
                type: this.sequelize.QueryTypes.DELETE
            })
            return{message: 'Country Deleted'}
        } catch(err) {
            return{message: 'Country Not Deleted'}
        }
    }

    async updateCountry(country){
        let query;
        try{
            query = await this.sequelize.query('UPDATE country SET country_name = :country_name, redion_id = :redion_id WHERE id = :id',
            {
                replacements: {
                    country_name: country.country_name,
                    redion_id: country.redion_id,
                    id: country.id},
                type: this.sequelize.QueryTypes.UPDATE
            })
            return{message: 'Country Updated'}
        }catch{
            return{message: 'Country Not Updated'}
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
    async deleteCity(id) {
        let query;
        try{
            query = await this.sequelize.query("DELETE FROM city WHERE id= :id", 
            {
                replacements: {id: id},
                type: this.sequelize.QueryTypes.DELETE
            })
        } catch(err) {
            return{message: 'City Deleted'}
        }
    }
    
    async updateCity(city) {
        let query;
        try{
            query = await this.sequelize.query('UPDATE city SET city_name = :city_name, country_id = :country_id WHERE id = :id',
            {
                replacements: {
                    city_name: city.city_name,
                    country_id: city.country_id,
                    id: city.id},
                type: this.sequelize.QueryTypes.UPDATE
            })
        }catch{
            return{message: 'City Updated'}
        }
    }
}


module.exports = Location;