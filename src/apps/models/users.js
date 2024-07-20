const config = require("config");
const mongoose = require(config.get("app.database"))();

const userSchema = new mongoose.Schema({
    email:{
        type: String,
        require: true,
    },
    password:{
        type: String,
        require: true,
    },
    role:{
        type: String,
        require: true,
    },
    full_name:{
        type: String,
        default: null,
    }
});
const usersModel = mongoose.model("Users", userSchema, "users");
module.exports = usersModel;