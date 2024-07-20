const config = require("config");
const mongoose = require(config.get("app.database"))();

const itemSchema = new mongoose.Schema({
    prd_id: {
        type: mongoose.Types.ObjectId,
        required: true,
    },
    qty: {
        type: Number,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    }
})

const orderSchema = new mongoose.Schema({
    totalPrice: {
        type: Number,
        required: true,
    },
    fullName: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    method: {
        type: Number,
    },
    items: {
        type: [itemSchema],
        required: true,
    }
}, { timestamps: true })

const OrderModel = mongoose.model("Order", orderSchema, "orders");
module.exports = OrderModel;