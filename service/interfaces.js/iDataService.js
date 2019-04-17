function iDataAccess() {
    if (!(this instanceof iDataAccess)) {
        return new iDataAccess();
    }
}

iDataAccess.prototype.selectAll = unimplememtedFunction;

function unimplememtedFunction() {
    throw new Error('This method needs to be implemented');
}

module.exports = iDataAccess;