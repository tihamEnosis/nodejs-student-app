const { intChecker } = require("../utils/valueTypeIntCheck");

const paramShouldBeINT = (req, res, next) => {
    if (intChecker(req.params.studentId) === false) {
        return next({ status: 400, message: 'Invalid Id' })
    }
    next()
}

module.exports = { paramShouldBeINT }