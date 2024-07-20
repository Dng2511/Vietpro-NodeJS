const usersModel = require("../models/users");
const pagination = require("../../common/pagination");


const index = async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    let limit = 6;
    let skip = page*limit - limit;
    const totalRows = await usersModel.countDocuments();
    const totalPages = Math.ceil(totalRows/limit);
    const users = await usersModel.find().skip(skip).limit(limit).sort({role: 1, _id: -1});
    const next = page + 1;
    const prev = page - 1;
    const hasNext = next < totalPages? true : false;
    const hasPrev = prev > 1? true : false;
    res.render("./admin/users/user", {users, pagination: pagination(page, totalPages), skip, next, prev, hasNext, hasPrev});
}

const create = async (req, res) => {
    res.render("./admin/users/add_user");

}


module.exports = {
    index,
    create,
}