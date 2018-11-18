const api = require('./api');
module.exports = function(app, db) {
    api(app, db);
    // Тут, позже, будут и другие обработчики маршрутов
};