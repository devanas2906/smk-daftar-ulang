const path = require('path');

const nocacheHTML = (req, res, next) => {
    const urlPath = req.path;
    const fileExtension = path.extname(urlPath).toLowerCase();

    if (fileExtension === "" || fileExtension === ".html") res.set('Cache-Control', 'no-store');

    next();
};

module.exports = { nocacheHTML };