const controller = require('../../core/cliente/controller');

module.exports = (app) => {

    app.route('/api/cliente')
        .get(controller.selecionarCliente)
        .post(controller.inserirCliente);

    app.route('/api/cliente/:id')
        .get(controller.buscarCliente)
        .put(controller.atualizarCliente)
        .delete(controller.excluirCliente);

}