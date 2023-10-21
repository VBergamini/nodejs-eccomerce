const CategoriesModel = require("../../models/categoriesModel");
const BrandsModel = require("../../models/brandsModel");
const ProductsModel = require("../../models/productsModel");
const UsersModel = require("../../models/usersModel");

class StoreHomeController {

    // get
    async storeFrontView(req, res) {

        var logedUser = new UsersModel();
        logedUser = await logedUser.getUser(req.cookies.logedUser);

        var category = new CategoriesModel();
        var categoryList = await category.listCategories();        

        var brand = new BrandsModel();
        var brandList = await brand.listBrands();

        var product = new ProductsModel();
        var productList = await product.listProducts();
        
        res.render('store/home/storeHome', {layout: 'store/layout/storeLayout', categoryList: categoryList, brandList: brandList, productList: productList, url: req.url, paramId: req.params.id, logedUser: logedUser});

    }

    // get
    async brandFilterView(req, res) {

        var logedUser = new UsersModel();
        logedUser = await logedUser.getUser(req.cookies.logedUser);

        var category = new CategoriesModel();
        var categoryList = await category.listCategories();

        var brand = new BrandsModel();
        var brandList = await brand.listBrands();

        var productList = await brand.filterBrand(req.params.id);

        res.render('store/home/storeHome', {layout: 'store/layout/storeLayout', categoryList: categoryList, brandList: brandList, productList: productList, url: req.url, paramId: req.params.id, logedUser: logedUser});
                    
    }

    // post
    async searchView(req, res) {

        var logedUser = new UsersModel();
        logedUser = await logedUser.getUser(req.cookies.logedUser);

        var searchQuery = req.query.s;
        var minValue = req.query.min;
        var maxValue = req.query.max;

        var category = new CategoriesModel();
        var categoryList = await category.listCategories();

        var brand = new BrandsModel();
        var brandList = await brand.listBrands();

        var product = new ProductsModel();
        var productList = await product.searchProducts(searchQuery, minValue, maxValue);

        res.render('store/home/storeHome', {layout: 'store/layout/storeLayout', categoryList: categoryList, brandList: brandList, productList: productList, url: req.url, logedUser: logedUser});

    }

}

module.exports = StoreHomeController;