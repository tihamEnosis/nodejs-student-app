const positiveIntChecker = (val) => {
    if (!/^\d+$/.test(val)) {
        return false;
    }
    if (/^0.*/.test(val)) {
        return false;
    }
    if (parseInt(val) < 0) {
        return false;
    }
    return true;
};

module.exports = { positiveIntChecker };