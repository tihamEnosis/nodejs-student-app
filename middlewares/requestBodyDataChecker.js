const fs = require('fs');
const { positiveIntChecker } = require("../utils/valueTypeIntCheck");

const bodyDataValidation = async (req, res, next) => {
    var errorObject = { isValid: true };

    if (!req.body.firstName) {
        errorObject = { isValid: false, status: 400, message: 'First name required' };
    }
    else if (!req.body.firstName.trim() || !/^[A-Za-z0-9]+$/i.test(req.body.firstName.trim())) {
        errorObject = { isValid: false, status: 400, message: 'Invalid first name' };
    }


    else if (!req.body.lastName) {
        errorObject = { isValid: false, status: 400, message: 'Last name required' };
    }
    else if (!req.body.lastName.trim() || !/^[A-Za-z0-9]+$/i.test(req.body.lastName.trim())) {
        errorObject = { isValid: false, status: 400, message: 'Invalid last name' };
    }


    else if (!req.body.age) {
        errorObject = { isValid: false, status: 400, message: 'Age required' };
    }
    else if (!positiveIntChecker(req.body.age.trim()) || parseInt(req.body.age.trim()) < 1 || parseInt(req.body.age.trim()) > 120) {
        errorObject = { isValid: false, status: 400, message: 'Invalid age' };
    }


    else if (!req.body.gender) {
        errorObject = { isValid: false, status: 400, message: 'Gender required' };
    }
    else if (req.body.gender.trim() !== 'Male' && req.body.gender.trim() !== 'Female') {
        errorObject = { isValid: false, status: 400, message: 'Invalid gender' };
    }


    else if (!req.file) {
        errorObject = { isValid: false, status: 400, message: 'Profile picture required' };
    }


    if (!errorObject.isValid) {
        return next(errorObject)
    }

    next();
}

module.exports = { bodyDataValidation };