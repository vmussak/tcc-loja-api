module.exports = (req, res, next) => {
    res.error = (message, status, content) => {
        const resp = {
            message: message,
            content: content,
            statusCode: status || 500
        };
        
        res.status(resp.statusCode).json(resp);
        next();
    };

    res.ok = (content, status) => {
        const resp = {
            content: content,
            statusCode: status || 200
        };

        res.status(resp.statusCode).json(resp);
        next();
    }

    next();
};