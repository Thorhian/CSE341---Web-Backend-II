const fs = require('fs');
const path = require('path');

module.exports = class Items {
    getItems(callBack) {
        fs.readFile(path.join(__dirname, 'items.json'), callBack);
    }
}
