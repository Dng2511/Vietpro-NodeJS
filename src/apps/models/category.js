const config = require("config");
const mongoose = require(config.get("app.database"))();

const categorySchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        default: null,
    },
    slug: {
        type: String,
        required: true,
    },
}, {timestamps: true,}
);

const categoryModel = mongoose.model("Category", categorySchema, "categories");
module.exports = categoryModel;