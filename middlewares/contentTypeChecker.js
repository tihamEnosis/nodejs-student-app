const contentTypeCheck = (req, res, next) => {
    if (req.headers['content-type']?.startsWith('multipart/form-data')) {
        return next();
    } else {
        return next({ status: 400, message: 'content-type must be mulipart/form-data' });
    }
}

module.exports = { contentTypeCheck };