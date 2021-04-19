module.exports = (err, req, res, next) => {
    console.log('express error:', err);

    if (err.code && err.code >= 400) {
        err.message = err.message ? err.message : '';
        res.status(err.code).json({
            code: err.code,
            message: err.message,
            ...err
        })
    } else {
        next();
    }
}