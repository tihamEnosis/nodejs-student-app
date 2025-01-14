const fs = require('fs')
const { intChecker } = require("../utils/valueTypeIntCheck");

const bodyDataValidation = async (req, res, next) => {
    var errorObject = {}

    if (req.body.firstName === null || req.body.firstName === undefined || req.body.firstName === '') {
        errorObject = { isValid: false, status: 400, message: 'First name required' }
    }
    else if (req.body.firstName.trim() === '' || /[a-z0-9]/i.test(req.body.firstName.trim()) === false) {
        errorObject = { isValid: false, status: 400, message: 'Invalid first name' }
    }


    else if (req.body.lastName === null || req.body.lastName === undefined || req.body.lastName === '') {
        errorObject = { isValid: false, status: 400, message: 'Last name required' }
    }
    else if (req.body.lastName.trim() === '' || /[a-z0-9]/i.test(req.body.lastName.trim()) === false) {
        errorObject = { isValid: false, status: 400, message: 'Invalid last name' }
    }


    else if (req.body.age === null || req.body.age === undefined || req.body.age === '') {
        errorObject = { isValid: false, status: 400, message: 'Age required' }
    }
    else if (intChecker(req.body.age.trim()) === false || parseInt(req.body.age.trim()) < 1 || parseInt(req.body.age.trim()) > 120) {
        errorObject = { isValid: false, status: 400, message: 'Invalid age' }
    }


    else if (req.body.gender === null || req.body.gender === undefined || req.body.gender === '') {
        errorObject = { isValid: false, status: 400, message: 'Gender required' }
    }
    else if (req.body.gender.trim() !== 'Male' && req.body.gender.trim() !== 'Female') {
        errorObject = { isValid: false, status: 400, message: 'Invalid gender' }
    }


    else if (req.file === undefined) {
        errorObject = { isValid: false, status: 400, message: 'Profile picture required' };
    }


    if (errorObject.isValid !== undefined) {
        return next(errorObject)
    }

    next()
}

module.exports = { bodyDataValidation }