const Database = require('../db/database');
const conexao = new Database();

class ProductsModel {

    #productId;
    #productCode;
    #productName;
    #productQuantity;
    #categoryId;
    #categoryName;
    #brandId;
    #brandName;
    #productPrice;
    #productImage;
    #haveImmage;

    get productId() { return this.#productId; } set productId(productId) { this.#productId = productId; }
    get productCode() { return this.#productCode; } set productCode(productCode) { this.#productCode = productCode; }
    get productName() { return this.#productName; } set productName(productName) { this.#productName = productName; }
    get productQuantity() { return this.#productQuantity; } set productQuantity(productQuantity) { this.#productQuantity = productQuantity; }
    get categoryId() { return this.#categoryId; } set categoryId(categoryId) { this.#categoryId = categoryId; }
    get categoryName() { return this.#categoryName; } set categoryName(categoryName) { this.#categoryName = categoryName; }
    get brandId() { return this.#brandId; } set brandId(brandId) { this.#brandId = brandId; }
    get brandName() { return this.#brandName; } set brandName(brandName) { this.#brandName = brandName; }
    get productPrice() { return this.#productPrice; } set productPrice(productPrice) { this.#productPrice = productPrice; }
    get productImage() { return this.#productImage; } set productImage(productImage) { this.#productImage = productImage; }
    get haveImmage() { return this.#haveImmage } set haveImmage(haveImmage) { this.#haveImmage = haveImmage }

    constructor(productId, productCode, productName, productQuantity, categoryId, brandId, categoryName, brandName, productPrice, productImage) {

        this.#productId = productId;
        this.#productCode = productCode;
        this.#productName = productName;
        this.#productQuantity = productQuantity;
        this.#categoryId = categoryId;
        this.#categoryName = categoryName;
        this.#brandId = brandId;
        this.#brandName = brandName;
        this.#productPrice = productPrice;
        this.#productImage = productImage;

    }

    async deleteProduct(code) {

        var sql = "DELETE FROM tb_products WHERE prd_id = ?";
        var values = [code];
        var result = await conexao.ExecutaComandoNonQuery(sql, values);

        return result;

    }

    async createProduct() {

        // create product
        if (this.#productId == 0) {

            let sql = "INSERT INTO tb_products (prd_cod, prd_name, prd_quantity, cat_id, brand_id, prd_price, prd_image) VALUES (?, ?, ?, ?, ?, ?, ?)";
            let values = [this.#productCode, this.#productName, this.#productQuantity, this.#categoryId, this.#brandId, this.#productPrice, this.#productImage];

            return await conexao.ExecutaComandoNonQuery(sql, values);

        }
        else {

            //update product
            let sql = '';
            let values = [];

            if(this.#productImage != null) {
            
                sql = "UPDATE tb_products SET prd_cod = ?, prd_name = ?, prd_quantity = ?, cat_id = ?, brand_id = ?, prd_price = ?, prd_image = ? WHERE prd_id = ?";
                values = [this.#productCode, this.#productName, this.#productQuantity, this.#categoryId, this.#brandId, this.#productPrice, this.#productImage, this.#productId];

            }
            else {

                sql = "UPDATE tb_products SET prd_cod = ?, prd_name =?, prd_quantity = ?, cat_id = ?, brand_id = ?, prd_price = ? WHERE prd_id = ?";
                values = [this.#productCode, this.#productName, this.#productQuantity, this.#categoryId, this.#brandId, this.#productPrice, this.#productId];
    
            }

            return await conexao.ExecutaComandoNonQuery(sql, values) > 0;

        }

    }
  
    async findProduct(id) {

        var sql = 'SELECT * FROM tb_products WHERE prd_id = ?';
        var values = [id];
        var rows = await conexao.ExecutaComando(sql, values);
        var product = '';

        if (rows.length > 0) {

            let row = rows[0];
            let image = '';
            let haveImmage = false;

            if (row['prd_image'] != null) {

                image = global.PATH_TO_PRODUCTS_IMAGE + row['prd_image'];
                haveImmage = true;

            }
            else {

                image = global.PATH_TO_PRODUCTS_IMAGE + 'No-image.png';

            }

            product = new ProductsModel(row['prd_id'], row['prd_cod'], row['prd_name'], row['prd_quantity'], row['cat_id'], row['brand_id'], '', '', row['prd_price'], image);
            product.haveImmage = haveImmage;

        }

        return product;
    }
    
    async listProducts() {

        var sql = 'SELECT * FROM tb_products p INNER JOIN tb_categories c ON p.cat_id = c.cat_id INNER JOIN tb_brands b ON p.brand_id = b.brand_id';
        var rows = await conexao.ExecutaComando(sql);
        var listProducs = [];

        if (rows.length > 0) {

            for (let i=0; i<rows.length; i++) {

                let row = rows[i];
                let image = '';

                if (row['prd_image'] != null) {

                    image = global.PATH_TO_PRODUCTS_IMAGE + row['prd_image'];

                }
                else {

                    image = global.PATH_TO_PRODUCTS_IMAGE + 'No-image.png';

                }

                listProducs.push(new ProductsModel(row['prd_id'], row['prd_cod'], row['prd_name'], row['prd_quantity'], row['cat_id'], row['brand_id'], row['cat_name'], row['brand_name'], row['prd_price'], image));

            }

        }

        return listProducs;
        
    }

}

module.exports = ProductsModel;