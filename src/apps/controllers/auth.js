const usersModel = require("../models/users");

const getLogin = (req, res) => {
    let invalid = false;
    res.render("./admin/login", {invalid});
}
const postLogin = async (req, res) => {

    const {email, password} = req.body;

    const user = await usersModel.find({email, password})
    if (user.length > 0){
        req.session.email = email;
        req.session.password = password;
        res.redirect("/admin/dashboard");
        }
    else {
        invalid = true;
        res.render("./admin/login", {invalid})
    }
}

const logout = (req, res) => {
    req.session.destroy();
    res.redirect("/");
}

module.exports = {
    getLogin, postLogin,
    logout,
}
