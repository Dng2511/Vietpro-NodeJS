const express = require("express");
const testController = require("../apps/controllers/test");

const Auth = require("../apps/controllers/auth");
const Product = require("../apps/controllers/product");
const Admin = require("../apps/controllers/admin");
const User = require("../apps/controllers/user");
const Site = require("../apps/controllers/site");

//Middleware
const AuthMiddleware = require("../apps/middlewares/auth");
const UploadMiddleware = require("../apps/middlewares/upload");


const router = express.Router();


//Test
router.get("/test", testController.test)
router.get("/testform", testController.testForm);
router.post("/testform", testController.actionForm);
//Login Logout
router.get("/admin/login", AuthMiddleware.checkLogin, Auth.getLogin);
router.post("/admin/login", Auth.postLogin);
router.get("/admin/logout", Auth.logout);


//Admin Dashboard

router.get("/admin/dashboard", AuthMiddleware.checkAdmin, Admin.dashboard);

//Admin Product
router.get("/admin/products", AuthMiddleware.checkAdmin, Product.index);
router.get("/admin/products/create", AuthMiddleware.checkAdmin, Product.create);
router.post("/admin/products/store", 
            AuthMiddleware.checkAdmin,
            UploadMiddleware.single("thumbnail"), 
            Product.store);
router.get("/admin/products/delete/:id", AuthMiddleware.checkAdmin, Product.del);
router.get("/admin/products/edit/:id", AuthMiddleware.checkAdmin, Product.edit);
router.post("/admin/products/update/:id", AuthMiddleware.checkAdmin, UploadMiddleware.single("thumbnail"), Product.update);



//Admin User

router.get("/admin/users", User.index);
router.get("/admin/users/create", User.create);
router.get("/admin/users/edit/:id", (req, res) => res.send("/admin/users/edit/:id"));
router.get("/admin/users/delete/:id", (req, res) => res.send("/admin/users/delete/:id"));

//
router.get("/admin/categories", (req, res) => res.send("/admin/categories"));
router.get("/admin/categories/create", (req, res) => res.send("/admin/categories/create"));
router.get("/admin/categories/edit/:id", (req, res) => res.send("/admin/categories/edit/:id"));
router.get("/admin/categories/delete/:id", (req, res) => res.send("/admin/categories/delete/:id"));

//Site
router.get("/", Site.index);
router.get("/category/:slug", Site.category);
router.get("/product/:slug::id", Site.product);
router.post("/product/:slug::id", Site.product);
router.get("/cart", Site.cart);
router.post("/add-to-cart", Site.addToCart);
router.post("/update-cart", Site.updateCart);
router.get("/delete-cart/:id", Site.deleteCart);
router.post("/order", Site.order);
router.get("/search", Site.search);
router.get("/success", Site.success);

module.exports = router;