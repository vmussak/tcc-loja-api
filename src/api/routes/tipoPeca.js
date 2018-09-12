const controller = require('../../core/tipoPeca/controller');

module.exports = (app) => {

    app.route('/api/tipo-peca')
        .get(controller.selecionarTipoPeca);

}