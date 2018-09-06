const controller = require('../../core/login/controller');

module.exports = (app) => {

    app.route('/api/login/:login')
        .get(controller.buscaUsuarioLogin);

    app.route('/api/login')
        .post(controller.efetuarLogin);

}