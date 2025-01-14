const intChecker = (val) => {
    if (/^\d+$/.test(val) === false) {
        return false
    }
    if (/^0.*/.test(val) === true) {
        return false
    }
    if (parseInt(val) < 0) {
        return false
    }
    return true;
}

module.exports = { intChecker }