const Database = require('../db/database');
const ProductsModel = require('./productsModel');
const connect = new Database();

class CategoriesModel {

    #categoryId; #categoryName; #categoryImage; #haveImage;

    get categoryId() { return this.#categoryId; } set categoryId(categoryId) { this.#categoryId = categoryId; }
    get categoryName() { return this.#categoryName; } set categoryName(categoryName) { this.#categoryName = categoryName; }
    get categoryImage() { return this.#categoryImage; } set categoryImage(categoryImage) { this.#categoryImage = categoryImage; }
    get haveImage() { return this.#haveImage; } set haveImage(haveImage) { this.#haveImage = haveImage; }

    constructor(categoryId, categoryName, categoryImage) {

        this.#categoryId = categoryId;
        this.#categoryName = categoryName;
        this.#categoryImage = categoryImage;

    }

    async listCategories() {

        var sql = 'SELECT * FROM tb_categories ORDER BY cat_name';
        var rows = await connect.QueryCommand(sql);
        var categoryList = [];

        if (rows.length > 0) {

            for (let i=0; i<rows.length; i++) {

                let row = rows[i];
                let image = '';

                if(row['cat_image'] != null) {

                    image = global.PATH_TO_CATEGORIES_IMAGE + row['cat_image'];

                }
                else {

                    image = global.PATH_TO_CATEGORIES_IMAGE + 'No-image.png';

                }

                categoryList.push(new CategoriesModel(row['cat_id'], row['cat_name'], image));

            }

        }

        return categoryList;

    }

    async createCategory() {
        
        if (this.#categoryId == 0) {

            let sql = 'INSERT INTO tb_categories (cat_name, cat_image) VALUES (?, ?)';
            let values = [this.#categoryName, this.#categoryImage];

            return await connect.NonQueryCommand(sql, values);

        }
        else {
            let sql = '';
            let values = [];

            if (this.#categoryImage != null) {

                sql = 'UPDATE tb_categories SET cat_name = ?, cat_image = ? WHERE cat_id = ?';
                values = [this.#categoryName, this.#categoryImage, this.#categoryId];

            }
            else {

                sql = 'UPDATE tb_categories SET cat_name = ? WHERE cat_id = ?';
                values = [this.#categoryName, this.#categoryId];

            }

            return await connect.NonQueryCommand(sql, values) > 0;

        }
    }

    async findCategory(id) {

        var sql = 'SELECT * FROM tb_categories WHERE cat_id = ?';
        var values = [id];

        var rows = await connect.QueryCommand(sql, values);
        var category = null;

        if (rows.length > 0) {

            let row = rows[0];

            let image = '';
            let haveImmage = false;

            if (row['cat_image'] != null) {

                image = global.PATH_TO_CATEGORIES_IMAGE + row['cat_image'];
                haveImmage = true;

            }
            else {

                image = global.PATH_TO_CATEGORIES_IMAGE + 'No-image.png';

            }

            category = new CategoriesModel(row['cat_id'], row['cat_name'], image);
            category.haveImage = haveImmage;

        }

        return category;

    }

    async filterCategory(catId) {

        var productList = [];
        var sql = 'SELECT * FROM tb_products WHERE cat_id = ?';
        var values = [catId];

        var rows = await connect.QueryCommand(sql, values);
        
        if(rows.length > 0) {

            for (let i=0; i<rows.length; i++) {

                let row = rows[i];

                let product = new ProductsModel(row);
                product = await product.findProduct(row['prd_id']);
                productList.push(product);

            }

        }

        return productList; 

    }

    deleteCategory(id) {

        var sql = 'DELETE FROM tb_categories WHERE cat_id = ?';
        var values = [id];

        var  result = connect.NonQueryCommand(sql, values);

        return result;
        
    }

    async categoryIsEmpty(catId) {

        var sql = 'SELECT p.prd_id FROM tb_products p INNER JOIN tb_categories c ON p.cat_id = c.cat_id WHERE p.cat_id = ?';
        var values = [catId];

        return await connect.QueryCommand(sql, values) == 0;

    }

}

module.exports = CategoriesModel;