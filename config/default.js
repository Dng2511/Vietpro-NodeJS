module.exports = {
    app:{
        port: 8000,
        static_folder: `${__dirname}/../src/public`,
        router: `${__dirname}/../src/router/web`,
        view_folder: `${__dirname}/../src/apps/views`,
        view_engine: "ejs",
        database: `${__dirname}/../src/common/database`,
        session_secret:"etronTR04",
        session_cookie_secure: false, 
    }
}