const productModel = require("../models/product");
const categoryModel = require("../models/category");
const pagination = require("../../common/pagination");
const fs = require("fs");
const slug = require("slug");
const path = require("path");
const index = async (req, res) =>{
    const path = req.path;
    const limit =6;
    const page = parseInt(req.query.page) || 1;
    const skip = page*limit - limit;
    const totalRows = await productModel.countDocuments();
    const totalPages = Math.ceil(totalRows/limit);
    const products = await productModel
        .find({}).limit(limit).skip(skip)
        .populate({path: "cat_id"})
        .sort({_id: -1});
    const next = page + 1;
    const prev = page - 1;
    const hasNext = next < totalPages? true : false;
    const hasPrev = prev > 1? true : false;
    res.render("./admin/products/product", {products, pagination: pagination(page, totalPages), path, skip, next, prev, hasNext, hasPrev});
}
const create = async (req, res) =>{
    const categories = await categoryModel.find();
    res.render("./admin/products/add_product", {categories});
}

const store = (req, res) => {
    const {file, body} = req;
    const product = {
        name: body.name,
        slug: slug(body.name),
        price: body.price,
        warranty: body.warranty,
        accessories: body.accessories,
        promotion: body.promotion,
        status: body.status,
        cat_id: body.cat_id,
        is_stock: body.is_stock==1,
        featured: body.featured==1,
        description: body.description,
    }
    if (file){
        const thumbnail = "products/"+file.originalname;
        fs.renameSync(file.path, path.resolve("src/public/images", thumbnail));
        product["thumbnail"] = thumbnail;
        new productModel(product).save();
        res.redirect('/admin/products');
    }

}


const edit = async (req, res) =>{
    const id = req.params.id;
    const categories = await categoryModel.find();
    const product = await productModel.findById(id);
    res.render("./admin/products/edit_product", { product, categories });
}

const update = async (req, res) => {
    const id = req.params.id;
    const {file, body} = req;
    const product = {
        name: body.name,
        slug: slug(body.name),
        price: body.price,
        warranty: body.warranty,
        accessories: body.accessories,
        promotion: body.promotion,
        status: body.status,
        cat_id: body.cat_id,
        is_stock: body.is_stock==1,
        featured: body.featured==1,
        description: body.description,
    }
    if (file){
        const thumbnail = "products/"+file.originalname;
        fs.renameSync(file.path, path.resolve("src/public/images", thumbnail));
        product["thumbnail"] = thumbnail;
    }
    await productModel.updateOne({_id: id}, {$set: product});
    res.redirect('/admin/products');
}

const del = async (req, res) =>{
    const id = req.params.id;
    await productModel.deleteOne({_id: id});
    res.redirect('/admin/products');
}
module.exports = {
    index,
    create,
    edit,
    del,
    store,
    update
}