const controller = require('../../core/peca/controller');

module.exports = (app) => {

    app.route('/api/peca')
        .get(controller.selecionarPeca)
        .post(controller.inserirPeca);

    app.route('/api/peca/:id')
        .get(controller.buscarPeca)
        .put(controller.atualizarPeca)
        .delete(controller.excluirPeca);

}