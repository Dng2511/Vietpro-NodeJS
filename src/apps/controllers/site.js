const categoryModel = require("../models/category");
const productModel = require("../models/product");
const commentModel = require("../models/comment");
const pagination = require("../../common/pagination");
const OrderModel = require("../models/order");


const index = async (req, res) => {
    const prominentProducts = await productModel.find({
        featured: true,
        is_stock: true
    }).limit(6).sort({ _id: -1 });;
    const newProducts = await productModel.find({
        is_stock: true,
    }).limit(6).sort({ _id: -1 });;
    console.log(req.params);


    res.render("./site/index", { prominentProducts, newProducts });
}
const category = async (req, res) => {

    const slug = req.params.slug;
    const category = await categoryModel.find({ slug: slug });
    const path = req.path + '?';
    const limit = 9;
    const page = parseInt(req.query.page) || 1;
    const skip = page * limit - limit;
    const totalRows = await productModel.countDocuments({ cat_id: category[0]._id });
    const totalPages = Math.ceil(totalRows / limit);
    const products = await productModel
        .find({ cat_id: category[0]._id }).limit(limit).skip(skip)
        .sort({ _id: -1 });
    const next = page + 1;
    const prev = page - 1;
    const hasNext = next < totalPages ? true : false;
    const hasPrev = prev > 1 ? true : false;
    res.render("./site/category", { products, totalRows, pagination: pagination(page, totalPages), category, path, next, prev, hasNext, hasPrev });
}


const product = async (req, res) => {
    const id = req.params.id;
    const product = await productModel.findById(id);
    const comments = await commentModel.find({ prd_id: id }).sort({ _id: -1 });
    res.render("./site/product", { product, comments });
}
const search = async (req, res) => {
    const keyword = req.query.keyword;
    const limit = 9;
    const path = req.path + '?keyword=' + keyword + '&';
    const page = parseInt(req.query.page) || 1;
    const skip = page * limit - limit;
    const totalRows = await productModel.countDocuments({
        $text: {
            $search: keyword
        }
    });
    const totalPages = Math.ceil(totalRows / limit);
    const products = await productModel.find({
        $text: {
            $search: keyword
        }
    }).limit(limit).skip(skip).sort({ _id: -1 });
    const next = page + 1;
    const prev = page - 1;
    const hasNext = next < totalPages ? true : false;
    const hasPrev = prev > 1 ? true : false;

    res.render("./site/search", { products, keyword, totalRows, pagination: pagination(page, totalPages), path, next, prev, hasNext, hasPrev });
}


const cart = async (req, res) => {
    res.render("./site/cart", { items: req.session.cart });
}

const addToCart = async (req, res) => {
    const items = req.session.cart
    const id = req.body.id;
    const qty = parseInt(req.body.qty);
    let isExist = false;
    items.map((item) => {
        if (item.id === id) {
            item.qty += qty
            isExist = true;
        }
        return item;
    })
    if (!isExist) {
        const newProduct = await productModel.findById(id);
        items.push({
            id,
            name: newProduct.name,
            price: newProduct.price,
            img: newProduct.thumbnail,
            qty,
        });
    }
    req.session.cart = items;
    res.redirect("/cart");
}

const updateCart = (req, res) => {
    const items = req.session.cart;
    const products = req.body.products;
    items.map((item) => {
        item.qty = products[item.id];
        return item;
    })
    req.session.cart = items;
    res.redirect("/cart");
}
const deleteCart = (req, res) => {
    const id = req.params.id;
    const items = req.session.cart;
    req.session.cart = items.filter((item) => item.id != id);
    res.redirect("/cart");
}
const order = async (req, res) => {
    const items = req.session.cart;
    const { name, mail, phone, add } = req.body;
    const newOrder = {
        totalPrice: items.reduce((total, item)=> total+item.price*item.qty, 0),
        fullName: name,
        address: add,
        email: mail,
        phone: phone,
        method: 1,
        items: items.map(item => ({
            prd_id: item.id,
            qty: item.qty,
            price: item.price
        }))
    }
    new OrderModel(newOrder).save();
    req.session.cart = [];
    res.redirect("/success");
}

const success = async (req, res) => {
    res.render("./site/success",);
}
module.exports = {
            index,
            category,
            cart,
            addToCart,
            updateCart,
            deleteCart,
            order,
            product,
            search,
            success
        }