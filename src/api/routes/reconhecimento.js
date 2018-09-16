const controller = require('../../core/reconhecimento/controller');

module.exports = [
    {
        route: '/api/reconhecimento',
        method: 'post',
        controller: controller.reconhecerCliente
    },
    {
        route: '/api/reconhecimento/:idVisita',
        method: 'get',
        controller: controller.buscarClientePorVisita
    }
];