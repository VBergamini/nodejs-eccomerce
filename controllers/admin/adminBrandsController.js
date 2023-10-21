const fs = require('fs');
const BrandsModel = require("../../models/brandsModel");

class AdminBrandsController {

    // get
    async brandsView(req, res) {

        var brand = new BrandsModel();
        var brandList = await brand.listBrands();
        
        res.render('admin/brands/adminBrands', {layout: 'admin/layout/adminLayout', brandList: brandList});

    }

    // get
    async createBrandView(req, res) {

        res.render('admin/brands/adminBrandsCreate', {layout: 'admin/layout/adminLayout'});

    }

    // get
    async updateBrandView(req, res) {

        var brand = new BrandsModel();

        if(req.params.id != undefined && req.params.id != '') {

            brand = await brand.findBrand(req.params.id);

        }

        res.render('admin/brands/adminBrandsUpdate', {layout: 'admin/layout/adminLayout', brand});

    }

    // post
    async createBrand(req, res) {

        var ok = true;
        var brand = '';

        if(req.body.name != '') {

            if(req.file != undefined) {

                brand = new BrandsModel(0, req.body.name, req.file.filename);

            }
            else {

                brand = new BrandsModel(0, req.body.name, null);

            }

            ok = await brand.createBrand();

        }
        else {

            ok = false;
        }

        res.send({ok: ok, msg: 'Brand created'});

    }

    // put
    async updateBrand(req, res) {

        var ok = true;

        if(req.body.name != '') {

            let image = null;

            if(req.file != undefined) {

                image = req.file.filename;

                let brandOld = new BrandsModel();
                brandOld = await brandOld.findBrand(req.body.id);

                if(brandOld.haveImage == true) {

                    let fileExist = fs.existsSync(global.PROJECT_ROOT + '/public/' + brandOld.brandImage);

                    if(fileExist) {

                        // delete the storaged image
                        fs.unlinkSync(global.PROJECT_ROOT + '/public/' + brandOld.brandImage);

                    }

                }

            }

            let brand = new BrandsModel(req.body.id, req.body.name, image);

            ok = await brand.createBrand();

        }
        else {

            ok = false;

        }

        res.send({ok: ok, msg: 'Brand updated'});

    }

    // delete
    async deleteBrand(req, res) {

        var ok = true;

        if(req.body.id != '') {

            let brand = new BrandsModel();
            brand = await brand.findBrand(req.body.id);

            if(brand.haveImage == true) {

                let fileExist = fs.existsSync(global.PROJECT_ROOT + '/public/' + brand.brandImage);
                
                if(fileExist) {

                    // delete the storaged image
                    fs.unlinkSync(global.PROJECT_ROOT + '/public/' + brand.brandImage);

                }

            }

            ok = await brand.deleteBrand(req.body.id);

        }
        else {

            ok = false;

        }

        res.send({ok: ok});

    }

}

module.exports = AdminBrandsController;