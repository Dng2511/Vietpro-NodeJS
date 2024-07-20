const productModel = require("../models/product");
const categoryModel = require("../models/category");
let test = async (req, res)=>{
    /* const products = productModel.find().populate({path: "cat_id"}).exec((err, docs) =>{
        console.log(docs);
    }); */

    const product = await productModel.find();
    const category = await categoryModel.find();
    console.log(product.length+category.length);

    
}

const testForm = (req, res) =>{
    res.send(`
        <form method = post>
            <input type=email name=email/>
            <input type=submit name=spm value=send>
        </post> 
    `);
}

const actionForm = (req, res) =>{
    res.send(req.body.email)
}

module.exports = {
    testForm,
    actionForm,
    test,
}