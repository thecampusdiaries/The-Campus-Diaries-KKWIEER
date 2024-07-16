module.exports.logPath = (req, res, next) => {
    console.log(`\tRequest received: ${req.method} ${req.originalUrl}`);
    next();
}