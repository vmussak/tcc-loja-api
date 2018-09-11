const controller = require('../../core/usuario/controller');

module.exports = (app) => {

    app.route('/api/usuario')
        .get(controller.selecionarUsuario)
        .post(controller.inserirUsuario);

    app.route('/api/usuario/:id')
        .get(controller.buscarUsuario)
        .put(controller.atualizarUsuario)
        .delete(controller.excluirUsuario);

}