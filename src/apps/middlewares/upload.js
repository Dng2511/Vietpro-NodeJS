const multer = require('multer');
const upload = multer({dest: `${__dirname}/../../tmp/`});

module.exports = upload;