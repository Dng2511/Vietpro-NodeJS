const express = require("express");
const config = require("config");
const session = require("express-session");

const app = express();

//config view engine
app.set("views", config.get("app.view_folder"));
app.set("view engine", config.get("app.view_engine"));



//config static
app.use(express.urlencoded({extended:true}));
app.use("/static", express.static(config.get("app.static_folder")));

//config session
app.set('trust proxy', 1);



app.use(session({
    secret: config.get("app.session_secret"),
    resave: false,
    saveUninitialized: true,
    cookie: {
        secure: config.get("app.session_cookie_secure"),
    }
}));

app.use(require("./middlewares/cart"));
app.use(require("./middlewares/share"));

// Router
app.use(require(config.get("app.router")));
module.exports = app;