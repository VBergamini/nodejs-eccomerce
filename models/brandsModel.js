const Database = require('../db/database');
const ProductsModel = require('./productsModel');

const conexao = new Database();

class BrandsModel {

    #brandId;
    #brandName;
    #brandImage;
    #haveImage;

    get brandId() {return this.#brandId} set brandId(brandId) {this.#brandId = brandId}
    get brandName() {return this.#brandName} set brandName(brandName) {this.#brandName = brandName}
    get brandImage() {return this.#brandImage} set brandImage(brandImage) {this.#brandImage = brandImage}
    get haveImage() {return this.#haveImage} set haveImage(haveImage) {this.#haveImage = haveImage}

    constructor (brandId, brandName, brandImage) {

        this.#brandId = brandId;
        this.#brandName = brandName;
        this.#brandImage = brandImage;

    }

    async listBrands() {

        var sql = 'SELECT * FROM tb_brands ORDER BY brand_name';
        var rows = await conexao.ExecutaComando(sql);
        var brandList = [];

        if (rows.length > 0) {

            for (let i=0; i<rows.length; i++) {

                let row = rows[i];
                let image = '';

                if(row['brand_image'] != null) {

                    image = global.PATH_TO_BRANDS_IMAGE + row['brand_image'];
                    
                }
                else {

                    image = global.PATH_TO_BRANDS_IMAGE + 'No-image.png';

                }
        
                brandList.push(new BrandsModel(row['brand_id'], row['brand_name'], image));

            }

        }

        return brandList;
    }

    async createBrand() {

        if(this.#brandId == 0) {

            // create brand
            let sql = 'INSERT INTO tb_brands (brand_name, brand_image) VALUES (?, ?)';
            let values = [this.#brandName, this.#brandImage];

            return await conexao.ExecutaComandoNonQuery(sql, values);

        }
        else {

            // update brand
            let sql = '';
            let values = [];

            if(this.#brandImage != null) {

                // update image
                sql = 'UPDATE tb_brands SET brand_name = ?, brand_image = ? WHERE brand_id = ?';
                values = [this.#brandName, this.#brandImage, this.#brandId];

            }
            else {

                // not update image
                sql = 'UPDATE tb_brands SET brand_name = ? WHERE brand_id = ?';
                values = [this.#brandName, this.#brandId];

            }

            return await conexao.ExecutaComandoNonQuery(sql, values) > 0;

        }

    }

    async findBrand(brandId) {

        var sql = 'SELECT * FROM tb_brands WHERE brand_id = ?';
        var values = [brandId];

        var rows = await conexao.ExecutaComando(sql, values);
        var brand = null;

        if(rows.length > 0) {

            let row = rows[0];
            let image = '';
            let haveImage = false;

            if(row['brand_image'] != null) {

                image = global.PATH_TO_BRANDS_IMAGE + row['brand_image'];
                haveImage = true;

            }
            else {

                image = global.PATH_TO_BRANDS_IMAGE + 'No-image.png';

            }

            brand = new BrandsModel(row['brand_id'], row['brand_name'], image);
            brand.haveImage = haveImage;

        }

        return brand;

    }

    async filterBrand(brandId) {

        var brandList = [];
        var sql = 'SELECT * FROM tb_products WHERE brand_id = ?';
        var values = [brandId];

        var rows = await conexao.ExecutaComando(sql, values);
        
        if (rows.length > 0) {

            for (let i=0; i<rows.length; i++) {

                let row = rows[i];

                let product = new ProductsModel();
                product = await product.findProduct(row['prd_id']);
                brandList.push(product);

            }

        }

        return brandList;  
         
    }

    async deleteBrand(brandId) {

        var sql = 'DELETE FROM tb_brands WHERE brand_id = ?';
        var values = [brandId];

        var result = conexao.ExecutaComandoNonQuery(sql, values);

        return result;

    }

    async brandIsEmpty(brandId) {

        var sql = 'SELECT p.prd_id FROM tb_products p INNER JOIN tb_brands b ON p.brand_id = b.brand_id WHERE p.brand_id = ?';
        var values = [brandId];

        return await conexao.ExecutaComando(sql, values) == 0;

    }

}

module.exports = BrandsModel;