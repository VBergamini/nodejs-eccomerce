const BrandsModel = require("../../models/brandsModel");
const CategoriesModel = require("../../models/categoriesModel");
const UsersModel = require("../../models/usersModel");

class StoreCategoriesController {

    // get
    async categoriesView(req, res) {

        var logedUser = new UsersModel();
        logedUser = await logedUser.getUser(req.cookies.logedUser);

        // to navbar and display categories
        var category = new CategoriesModel();
        var categoryList = await category.listCategories();

        // to navbar
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

}

module.exports = StoreCategoriesController;