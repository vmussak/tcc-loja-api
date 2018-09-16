const controller = require('../../core/tipoPeca/controller');

module.exports = [
    {
        route: '/api/tipo-peca',
        method: 'get',
        controller: controller.selecionarTipoPeca
    }
];