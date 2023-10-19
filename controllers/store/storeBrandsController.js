const BrandsModel = require("../../models/brandsModel");
const CategoriesModel = require("../../models/categoriesModel");

class StoreBrandsController {

    // get
    async brandsView(req, res) {

        var category = new CategoriesModel();
        var categoryList = await category.listCategories();

        var brand = new BrandsModel();
        var brandList = await brand.listBrands();

        res.render('store/home/storeHome', {layout: 'store/layout/storeLayout', categoryList: categoryList, brandList: brandList, url: 'brands', paramId: req.params.id});

    }

    // get
    async brandsFilterView(req, res) {

        var category = new CategoriesModel();
        var categoryList = await category.listCategories();

        var brand = new BrandsModel();
        var brandList = await brand.listBrands();

        var productList = await brand.filterBrand(req.params.id);

        res.render('store/home/storeHome', {layout: 'store/layout/storeLayout', categoryList: categoryList, brandList: brandList, productList: productList, url: 'brands'+req.params.id, paramId: req.params.id });

    }

}

module.exports = StoreBrandsController;