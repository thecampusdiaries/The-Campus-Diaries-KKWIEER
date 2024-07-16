module.exports = (err, req, res, next) => {
    let { statusCode = 500, message = "Something went wrong" } = err;
    if (!err.message) {
        err.message = 'Oh No, Something went wrong!';
    }
    console.log(err);
    res.status(statusCode).render("error.ejs", { err });
};
