const controller = require('../../core/cliente/controller');

module.exports = [
    {
        route: '/api/cliente',
        method: 'get',
        controller: controller.selecionarCliente
    },
    {
        route: '/api/cliente',
        method: 'post',
        controller: controller.inserirCliente
    },
    {
        route: '/api/cliente/:id',
        method: 'get',
        controller: controller.buscarCliente
    },
    {
        route: '/api/cliente/:id',
        method: 'put',
        controller: controller.atualizarCliente
    },
    {
        route: '/api/cliente/:id',
        method: 'delete',
        controller: controller.excluirCliente
    }
];