//Importing packages
const express = require('express');
const cookieParser = require('cookie-parser');
const expressLayouts = require('express-ejs-layouts');
const Authentication = require('./middlewares/authentication');
const AdminDashboardRoute = require('./routes/admin/adminDashboardRoute');
const AdminLoginRoute = require('./routes/admin/adminLoginRoute');
const AdminUsersRoute = require('./routes/admin/adminUsersRoute');
const AdminProductsRoute = require('./routes/admin/adminProductsRoute');
const AdminBrandsRoute = require('./routes/admin/adminBrandsRoute');
const AdminCategoriesRoute = require('./routes/admin/adminCategoriesRoute');
const StoreRoute = require('./routes/store/storeRoute');

const app = express();
const auth = new Authentication();

//configuring the public repository (css, js, images)
app.use(express.static(__dirname + "/public"))

//configuring EJS template
app.set('view engine', 'ejs');

//configuring the views directory
app.set('views', './views');

// configuring the http request POST method
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// configuring cookies
app.use(cookieParser());

// configuring admin and store layout
app.use(expressLayouts);
app.set('adminLayout', './admin/layout/adminLayout');
app.set('storeLayout', './store/layout/storeLayout');

// public routes
var storeRoute = new StoreRoute();
app.use('/', storeRoute.router);
app.use('/store', storeRoute.router);

var adminLogin = new AdminLoginRoute();
app.use('/login', adminLogin.router);

// to authenticate loged user
app.use(auth.verifyLogedUser);

// private routes
var adminDashboard = new AdminDashboardRoute();
app.use('/dashboard', adminDashboard.router);

var adminUsers = new AdminUsersRoute();
app.use('/users', adminUsers.router);

var adminProducts = new AdminProductsRoute();
app.use('/products', adminProducts.router);

var adminBrands = new AdminBrandsRoute();
app.use("/brands", adminBrands.router);

var adminCategories = new AdminCategoriesRoute();
app.use("/categories", adminCategories.router);

global.PROJECT_ROOT = __dirname;
global.PATH_TO_PRODUCTS_IMAGE = '/img/admin/products/';
global.PATH_TO_CATEGORIES_IMAGE = '/img/admin/categories/';
global.PATH_TO_BRANDS_IMAGE = '/img/admin/brands/';

const server = app.listen('5001', function() {
    console.log('Server started at http://localhost:5001');
});
