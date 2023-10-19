const fs = require('fs');
const CategoriesModel = require("../../models/categoriesModel");
const BrandsModel = require("../../models/brandsModel");
const ProductsModel = require("../../models/productsModel");

class AdminProductsController {

    // get
    async productsView(req, res) {

        var product = new ProductsModel();
        var listProducts = await product.listProducts();

        res.render('admin/products/adminProducts', {layout: 'admin/layout/adminLayout', listProducts: listProducts});
    }

    // get
    async createProductView(req, res) {

        var brandList = [];
        var categoryList = [];

        var brand = new BrandsModel();
        brandList = await brand.listBrands(); 

        var category = new CategoriesModel();  
        categoryList = await category.listCategories();

        res.render('admin/products/adminProductsCreate', {layout: 'admin/layout/adminLayout', brandList: brandList, categoryList: categoryList });

    }

    // get
    async updateProductView(req, res) {

        var product = new ProductsModel();
        var brand = new BrandsModel();        
        var category = new CategoriesModel();

        if(req.params.id != undefined && req.params.id != '') {

            product = await product.findProduct(req.params.id);

        }

        var brandList = await brand.listBrands();
        var categoryList = await category.listCategories();

        res.render('admin/products/adminProductsUpdate', {layout: 'admin/layout/adminLayout', product: product, brandList: brandList, categoryList: categoryList });

    }

    // post
    async createProduct(req, res) {

        var ok = true;
        var product = '';

        if(req.body.code != '' && req.body.name != '' && req.body.quantity != '' && req.body.quantity != '0' && req.body.brand != '0' && req.body.category != '0' && req.body.price > '0') {

            if(req.file != undefined) {

                product = new ProductsModel(0, req.body.code, req.body.name, req.body.quantity, req.body.category, req.body.brand, "", "", req.body.price, req.file.filename);

            }
            else {

                product = new ProductsModel(0, req.body.code, req.body.name, req.body.quantity, req.body.category, req.body.brand, "", "", req.body.price, null);

            }

            ok = await product.createProduct();

        }
        else {

            ok = false;

        }

        res.send({ ok: ok, msg: 'Product created' });

    }

    // put
    async updateProduct(req, res) {

        var ok = true;

        if (req.body.code != '' && req.body.name != '' && req.body.quantity != '' && req.body.quantity  != '0' && req.body.brand != '0' && req.body.category  != '0' && req.body.price > '0') {

            let image = null;

            if (req.file != undefined) {

                image = req.file.filename;

                let productOld = new ProductsModel();
                productOld = await productOld.findProduct(req.body.id);
            
                if(productOld.haveImmage == true) {

                    let fileExist = fs.existsSync(global.PROJECT_ROOT + '/public/' + productOld.productImage);
                    if(fileExist) {
    
                        // delete the storaged image
                        fs.unlinkSync(global.PROJECT_ROOT + '/public/' + productOld.productImage);
    
                    }
                    
                }

            }

            let prodcut = new ProductsModel(req.body.id, req.body.code, req.body.name, req.body.quantity, req.body.category, req.body.brand, '', '', req.body.price, image);

            ok = await prodcut.createProduct();

        }
        else {

            ok = false;

        }

        res.send({ ok: ok, msg: 'Product updated' });

    }

    // delete
    async deleteProduct(req, res) {

        var ok = true;
        
        if(req.body.id != '') {

            let product = new ProductsModel();
            product = await product.findProduct(req.body.id);

            if(product.haveImmage == true) {

                let fileExist = fs.existsSync(global.PROJECT_ROOT + '/public/' + product.productImage);
                if(fileExist) {
    
                    // delete the storaged image
                    fs.unlinkSync(global.PROJECT_ROOT + '/public/' + product.productImage);
    
                }

            }

            ok = await product.deleteProduct(req.body.id);

        }
        else {

            ok = false;

        }

        res.send({ok: ok, msg: 'Product deleted'});
        
    }
}

module.exports = AdminProductsController;