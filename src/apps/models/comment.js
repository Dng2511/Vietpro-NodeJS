const config = require("config");
const mongoose = require(config.get("app.database"))();

const commentSchema = new mongoose.Schema({
    prd_id:{
        type: mongoose.Types.ObjectId,
        ref: "Product",
        require: true,
    },
    email: {
        type: String,
        require: true,
    },
    body: {
        type: String,
        require: true,
    },
    full_name: {
        type: String,
        require: true,
    }
}, {timestamps: true});

const commentModel = mongoose.model("Comment", commentSchema ,"comments");
module.exports = commentModel;