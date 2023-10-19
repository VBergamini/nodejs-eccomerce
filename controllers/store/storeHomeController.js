const CategoriesModel = require("../../models/categoriesModel");
const BrandsModel = require("../../models/brandsModel");
const ProductsModel = require("../../models/productsModel");

class StoreHomeController {

    // get
    async storeFrontView(req, res) {

        var category = new CategoriesModel();
        var categoryList = await category.listCategories();

        var brand = new BrandsModel();
        var brandList = await brand.listBrands();

        var product = new ProductsModel();
        var productList = await product.listProducts();
        
        res.render('store/home/storeHome', {layout: 'store/layout/storeLayout', categoryList: categoryList, brandList: brandList, productList: productList, url: req.url, paramId: req.params.id});

    }

    // get
    async brandFilterView(req, res) {
        var category = new CategoriesModel();
        var categoryList = await category.listCategories();
        var brand = new BrandsModel();
        var brandList = await brand.listBrands();
        var productList = await brand.filterBrand(req.params.id);

        res.render('store/home/storeHome', {layout: 'store/layout/storeLayout', categoryList: categoryList, brandList: brandList, productList: productList, url: req.url, paramId: req.params.id});
                    
    }

    // post
    async searchView(req, res) {

        var category = new CategoriesModel();
        var categoryList = await category.listCategories();
        var brand = new BrandsModel();
        var brandList = await brand.listBrands();
        var product = new ProductsModel();
        var productList = await product.listProducts();
        var searchList = await product.findProduct(req.body.busca);

        console.log(req.url)
        res.render('store/home/storeHome', {layout: 'store/layout/storeLayout', categoryList: categoryList, brandList: brandList, productList: productList, searchList: searchList, url: req.url});

    }

}

module.exports = StoreHomeController;