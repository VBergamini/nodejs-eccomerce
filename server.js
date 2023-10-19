//importando os packages instalados
const express = require('express');
const cookieParser = require('cookie-parser');
const expressLayouts = require('express-ejs-layouts');
const AdminHomeRoute = require('./routes/admin/adminHomeRoute');
const AdminLoginRoute = require('./routes/admin/adminLoginRoute');
const AdminUsersRoute = require('./routes/admin/adminUsersRoute');
const AdminProductsRoute = require('./routes/admin/adminProductsRoute');
const AdminBrandsRoute = require('./routes/admin/adminBrandsRoute');
const AdminCategoriesRoute = require('./routes/admin/adminCategoriesRoute');
const StoreHomeRoute = require('./routes/store/storeHomeRoute');
const StoreCategoriesRoute = require('./routes/store/storeCategoriesRoute');
const StoreBrandsRoute = require('./routes/store/storeBrandsRoute');

const app = express();

//configurando a nossa pasta public como o nosso repositorio de arquivos estáticos (css, js, imagens)
app.use(express.static(__dirname + "/public"))
//configuração das nossas views para utilizar a ferramenta EJS
app.set('view engine', 'ejs');
//Configuração de onde ficará nossas views
app.set('views', './views');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

app.use(expressLayouts);
app.set('adminLayout', './admin/layout/adminLayout');
app.set('storeLayout', './store/layout/storeLayout');

var adminHome = new AdminHomeRoute();
app.use('/', adminHome.router);

var adminLogin = new AdminLoginRoute();
app.use('/login', adminLogin.router);

var adminUsers = new AdminUsersRoute();
app.use('/users', adminUsers.router);

var adminProducts = new AdminProductsRoute();
app.use('/products', adminProducts.router);

var adminBrands = new AdminBrandsRoute();
app.use("/brands", adminBrands.router);

var adminCategories = new AdminCategoriesRoute();
app.use("/categories", adminCategories.router);

var storeHome = new StoreHomeRoute();
app.use('/store', storeHome.router);

var storeCategories = new StoreCategoriesRoute();
app.use('/store/categories', storeCategories.router);

var storeBrands = new StoreBrandsRoute();
app.use('/store/brands', storeBrands.router);

global.PROJECT_ROOT = __dirname;
global.PATH_TO_PRODUCTS_IMAGE = '/img/admin/products/';
global.PATH_TO_CATEGORIES_IMAGE = '/img/admin/categories/';
global.PATH_TO_BRANDS_IMAGE = '/img/admin/brands/';


const server = app.listen('5001', function() {
    console.log('Server started at http://localhost:5001/store');
});
