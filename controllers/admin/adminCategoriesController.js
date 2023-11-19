const fs = require('fs');
const CategoriesModel = require("../../models/categoriesModel");

class AdminCategoriesController {

    // get
    async categoriesView(req, res) {

        var category = new CategoriesModel();
        var categoryList = await category.listCategories();

        res.render('admin/categories/adminCategories', {layout: 'admin/layout/adminLayout', categoryList: categoryList});

    }

    // get
    async createCategoryView(req, res) {

        res.render('admin/categories/adminCategoriesCreate', {layout: 'admin/layout/adminLayout', });

    }

    // get
    async updateCategoryView(req, res) {

        var category = new CategoriesModel();

        if(req.params.id != undefined && req.params.id !=  '') {

            category = await category.findCategory(req.params.id);

        }

        res.render('admin/categories/adminCategoriesUpdate', {layout: 'admin/layout/adminLayout', category: category});

    }

    // post
    async createCategory(req, res) {

        var ok = true;
        var category = '';
        var msg = 'Category created successfully';

        if(req.body.name != '') {

            if(req.file != undefined) {

                category = new CategoriesModel(0, req.body.name, req.file.filename);

            }
            else {

                category = new CategoriesModel(0, req.body.name, null);

            }

            ok = await category.createCategory();

        }
        else {

            ok = false;
            msg = 'Error on create category';

        }

        res.send({ok: ok, msg: msg});
    }

    // put
    async updateCategory(req, res) {

        var ok = true;
        var msg = 'Category updated successfully';
        
        if(req.body.name != '') {

            let image = null;

            if(req.file != undefined) {

                image = req.file.filename;

                let categoryOld = new CategoriesModel();
                categoryOld = await categoryOld.findCategory(req.body.id);

                if(categoryOld.haveImage == true) {

                    let fileExist = fs.existsSync(global.PROJECT_ROOT + '/public/' + categoryOld.categoryImage);
                    
                    if(fileExist) {
    
                        // delete the storaged image
                        fs.unlinkSync(global.PROJECT_ROOT + '/public/' + categoryOld.categoryImage);
    
                    }

                }

            }

            let category = new CategoriesModel(req.body.id, req.body.name, image);

            ok = await category.createCategory();

        }
        else {

            ok = false;
            msg = 'Error on update category';
        }

        res.send({ok: ok, msg: msg});
        
    }

    // delete
    async deleteCategory(req, res) {

        var ok = true;
        var msg = 'Category deleted successfully';

        if(req.body.id != '') {

            let category = new CategoriesModel();

            if(await category.categoryIsEmpty(req.body.id) == true) {

                category = await category.findCategory(req.body.id);

                if(category.haveImage == true) {

                    let fileExist = fs.existsSync(global.PROJECT_ROOT + '/public/' + category.categoryImage);
                
                    if(fileExist) {
                    
                        // delete the storaged image
                        fs.unlinkSync(global.PROJECT_ROOT + '/public/' +  category.categoryImage);
    
                    }

                }

                ok = await category.deleteCategory(req.body.id);
            
            }
            else {

                ok = false;
                msg = 'Please remove all products from this category first';

            }

        }
        else {

            ok = false;
            msg = 'Error on request category';

        }

        res.send({ok: ok, msg: msg});

    }
    
}

module.exports = AdminCategoriesController;