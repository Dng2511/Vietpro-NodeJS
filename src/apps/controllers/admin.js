const productsModel = require("../models/product");
const usersModel = require("../models/users");


const dashboard = async (req, res) => {
    const products = await productsModel.find();
    const users = await usersModel.find();
    res.render("./admin/admin", {
        users: users.length, 
        products: products.length,
        
    });
}

module.exports = {
    dashboard
};