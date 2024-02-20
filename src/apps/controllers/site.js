const categoryModel = require("../models/category");
const productModel = require("../models/product");
const commentModel = require("../models/comment");
const pagination = require("../../common/pagination");


const index = async (req, res) => {
    const prominentProducts = await productModel.find({
        featured: true,
        is_stock: true
    }).limit(6).sort({_id: -1});;
    const newProducts = await productModel.find({
        is_stock: true,
    }).limit(6).sort({_id: -1});;
    console.log(req.params);


    res.render("./site/index", {prominentProducts, newProducts});
}
const category = async (req, res) => {
    
    const slug = req.params.slug;
    const category = await categoryModel.find({slug: slug});
    const path = req.path+'?';
    const limit = 9;
    const page = parseInt(req.query.page) || 1;
    const skip = page*limit - limit;
    const totalRows = await productModel.countDocuments({cat_id: category[0]._id});
    const totalPages = Math.ceil(totalRows/limit);
    const products = await productModel
        .find({cat_id: category[0]._id}).limit(limit).skip(skip)
        .sort({_id: -1});
    const next = page + 1;
    const prev = page - 1;
    const hasNext = next < totalPages? true : false;
    const hasPrev = prev > 1? true : false;
    res.render("./site/category", {products, totalRows, pagination: pagination(page, totalPages), category, path, next, prev, hasNext, hasPrev});
}

const cart = async (req, res) => {
    const 
    
    res.render("./site/cart");
}

const product = async  (req, res) => {
    const id = req.params.id;
    const product = await productModel.findById(id);
    const comments = await commentModel.find({prd_id: id}).sort({_id: -1});
    res.render("./site/product", {product, comments});
}
const search = async (req, res) => {
    const keyword = req.query.keyword;
    const limit = 9;
    const path = req.path+'?keyword='+keyword+'&';
    const page = parseInt(req.query.page) || 1;
    const skip = page*limit - limit;
    const totalRows = await productModel.countDocuments({
        $text:{
            $search: keyword
        }
    });
    const totalPages = Math.ceil(totalRows/limit);
    const products = await productModel.find({
        $text:{
            $search: keyword
        }
    }).limit(limit).skip(skip).sort({_id: -1});
    const next = page + 1;
    const prev = page - 1;
    const hasNext = next < totalPages? true : false;
    const hasPrev = prev > 1? true : false;
    
    res.render("./site/search", {products, keyword,  totalRows, pagination: pagination(page, totalPages), path, next, prev, hasNext, hasPrev});
}

const success = async (req, res) => {
    res.render("./site/success", );
}


module.exports = {
    index,
    category,
    cart,
    product,
    search,
    success
}