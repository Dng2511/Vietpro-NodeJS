const categoryModel = require("../models/category")

module.exports = async (req, res, next) => {
    res.locals.categories = await categoryModel.find();
    res.locals.cartQty = req.session.cart.length;
    next();
}