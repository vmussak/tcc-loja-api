const controller = require('../../core/peca/controller');

module.exports = [
    {
        route: '/api/peca',
        method: 'get',
        controller: controller.selecionarPeca
    },
    {
        route: '/api/peca',
        method: 'post',
        controller: controller.inserirPeca
    },
    {
        route: '/api/peca/:id',
        method: 'get',
        controller: controller.buscarPeca
    },
    {
        route: '/api/peca/:id',
        method: 'put',
        controller: controller.atualizarPeca
    },
    {
        route: '/api/peca/:id',
        method: 'delete',
        controller: controller.excluirPeca
    }
];