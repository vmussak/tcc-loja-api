const log = require('../helpers/log');

exports.notFound = function (req, res, next) {
    if (!res.finished) {
        res.status(404).json({
            statusCode: 404,
            message: 'A operação solicitada não foi encontrada'
        });
    }
    next();
};

exports.serverError = async function (err, req, res, next) {
    if (!res.finished) {
        res.status(500).json({
            statusCode: 500,
            message: 'Não foi possivel concluir a operação solicitada'
        });
    }

    log.logError(err);

    next();
};