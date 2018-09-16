async function loadRoutes(app) {

    require('./ping')(app);

    let actions = [
        ...require('./login'),
        ...require('./usuario'),
        ...require('./tipoPeca'),
        ...require('./peca'),
        ...require('./cliente'),
        ...require('./reconhecimento')
    ];

    actions.forEach(action => {
        app[action.method](action.route, exceptionFilter(action.controller))
    })
}

module.exports = loadRoutes;

function exceptionFilter(controller) {
    return async (req, res, next) => {
        try {
            await controller(req, res, next);
        } catch (ex) {
            res.status(ex.statusCode || ex.status || 500).json({ message: ex.message, content: ex });
        }
    }
}