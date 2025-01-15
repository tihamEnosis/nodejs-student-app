const { positiveIntChecker } = require("../utils/valueTypeIntCheck");

const paramShouldBePositiveINT = (req, res, next) => {
    if (!positiveIntChecker(req.params.studentId)) {
        return next({ status: 400, message: 'Invalid Id provided' });
    }
    next();
}

module.exports = { paramShouldBePositiveINT };