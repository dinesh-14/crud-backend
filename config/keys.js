if (process.env.NODE_ENV === "production") {
    module.exports = require('./prod');
    process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0;
    console.log('coonected on production');
} else {
    module.exports = require('./dev');
    process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0;
    console.log('connected on devlopement');
}