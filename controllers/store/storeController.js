const CategoriesModel = require("../../models/categoriesModel");
const BrandsModel = require("../../models/brandsModel");
const ProductsModel = require("../../models/productsModel");
const UsersModel = require("../../models/usersModel");

class StoreController {

    // get
    async homeView(req, res) {
 
        var logedUser = new UsersModel();
        logedUser = await logedUser.getUser(req.cookies.logedUser);

        // to navbar and display categories
        var category = new CategoriesModel();
        var categoryList = await category.listCategories();        

        // to navbar and display brands
        var brand = new BrandsModel();
        var brandList = await brand.listBrands();

        var product = new ProductsModel();
        var productList = await product.listProducts();
        
        res.render('store/home/storeHome', {layout: 'store/layout/storeLayout', categoryList: categoryList, brandList: brandList, productList: productList, url: req.url, paramId: req.params.id, logedUser: logedUser});

    }

    // get
    async categoriesView(req, res) {

        var logedUser = new UsersModel();
        logedUser = await logedUser.getUser(req.cookies.logedUser);

        // to navbar and display categories
        var category = new CategoriesModel();
        var categoryList = await category.listCategories();

        // to navbar and display brands
        var brand = new BrandsModel();
        var brandList = await brand.listBrands();

        res.render('store/home/storeHome', {layout: 'store/layout/storeLayout', categoryList: categoryList, brandList: brandList, url: 'categories', paramId: req.params.id, logedUser: logedUser});

    }

    // get
    async categoriesFilterView(req, res) {

        var logedUser = new UsersModel();
        logedUser = await logedUser.getUser(req.cookies.logedUser);

        var category = new CategoriesModel();
        var categoryList = await category.listCategories();

        var brand = new BrandsModel();
        var brandList = await brand.listBrands();

        var productList = await category.filterCategory(req.params.id);

        res.render('store/home/storeHome', {layout: 'store/layout/storeLayout', categoryList: categoryList, brandList: brandList, productList: productList, url: 'categories'+req.params.id, paramId: req.params.id, logedUser: logedUser});

    }

    // get
    async brandsView(req, res) {

        var logedUser = new UsersModel();
        logedUser = await logedUser.getUser(req.cookies.logedUser);

        // to navbar and display categories
        var category = new CategoriesModel();
        var categoryList = await category.listCategories();

        // to navbar and display brands
        var brand = new BrandsModel();
        var brandList = await brand.listBrands();

        res.render('store/home/storeHome', {layout: 'store/layout/storeLayout', categoryList: categoryList, brandList: brandList, url: 'brands', paramId: req.params.id, logedUser: logedUser});

    }

    // get
    async brandsFilterView(req, res) {

        var logedUser = new UsersModel();
        logedUser = await logedUser.getUser(req.cookies.logedUser);

        // to navbar and display categories
        var category = new CategoriesModel();
        var categoryList = await category.listCategories();

        // to navbar and display brands
        var brand = new BrandsModel();
        var brandList = await brand.listBrands();

        var productList = await brand.filterBrand(req.params.id);

        res.render('store/home/storeHome', {layout: 'store/layout/storeLayout', categoryList: categoryList, brandList: brandList, productList: productList, url: 'brands'+req.params.id, paramId: req.params.id, logedUser: logedUser});

    }

    // get
    async singleProductView(req, res) {

        var logedUser = new UsersModel();
        logedUser = await logedUser.getUser(req.cookies.logedUser);

        // to navbar and display categories
        var category = new CategoriesModel();
        var categoryList = await category.listCategories();

        // to navbar and display brands
        var brand = new BrandsModel();
        var brandList = await brand.listBrands();

        var product = new ProductsModel();
        product = await product.findProduct(req.params.id);
        category = await category.findCategory(product.categoryId)

        res.render('store/products/singleProduct', {layout: 'store/layout/storeLayout', categoryList: categoryList, brandList: brandList, product: product, url: 'products'+req.params.id, paramId: req.params.id, logedUser: logedUser, product: product, category: category});

    }

    // get
    async addToCart(req, res) {

        if(req.params.id != null) {

            let product = new ProductsModel();
            product = await product.findProduct(req.params.id);

            if(product != null) {

                let productJson = {
                    id: product.productId,
                    name: product.productName,
                    price: product.productPrice,
                    image: product.productImage,
                    quantity: 1
                }

                res.send({ok: true, product: productJson});

            }
            else {

                res.send({ok: false, msg: 'Product not found'});

            }
            
        }
        else {

            res.send({ok: false, msg: 'Invalid params'});

        }

    }

    // post
    async searchView(req, res) {

        var logedUser = new UsersModel();
        logedUser = await logedUser.getUser(req.cookies.logedUser);

        var searchQuery = req.query.s;
        var minValue = req.query.min;
        var maxValue = req.query.max;

        // to navbar and display categories
        var category = new CategoriesModel();
        var categoryList = await category.listCategories();

        // to navbar and display brands
        var brand = new BrandsModel();
        var brandList = await brand.listBrands();

        var product = new ProductsModel();
        var productList = await product.searchProducts(searchQuery, minValue, maxValue);

        res.render('store/home/storeHome', {layout: 'store/layout/storeLayout', categoryList: categoryList, brandList: brandList, productList: productList, url: req.url, logedUser: logedUser});

    }

    async saveOrder(req, res) {
        
        var productsList = req.body.productsList;
        if(productsList != null && productsList.length > 0) {

            // Contitua aqui
        }
    }

}

module.exports = StoreController;