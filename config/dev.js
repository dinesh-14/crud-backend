const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
module.exports = {

    MySQL: {
        "path": 'mysql://' + config.username + ':' + encodeURIComponent(config.password) + '@localhost:3306/mydb'
    }
};