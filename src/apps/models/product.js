const config = require("config");
const mongoose = require(config.get("app.database"))();

const productSchema = new mongoose.Schema({
    cat_id:{
        type: mongoose.Types.ObjectId,
        ref: "Category",
        require: true,
    },
    name:{
        type: String,
        text: true,
        require: true,
    },
    slug:{
        type: String,
        require: true,
    },
    price:{
        type: String,
        default: 0
    },
    warranty:{
        type: String,
    },
    accessories:{
        type: String,
    },
    promotion:{
        type: String,
    },
    description:{
        type: String,
    },
    status:{
        type: String,
    },
    thumbnail:{
        type: String,
    }, 
    featured:{
        type: Boolean,
        default: false,
    },
    is_stock:{
        type: Boolean,
        default: true,
    }
}, {timestamps: true});
const productModel = mongoose.model("Product", productSchema, "products");
module.exports = productModel;