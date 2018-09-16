const controller = require('../../core/usuario/controller');

module.exports = [
    {
        route: '/api/usuario',
        method: 'get',
        controller: controller.selecionarUsuario
    },
    {
        route: '/api/usuario',
        method: 'post',
        controller: controller.inserirUsuario
    },
    {
        route: '/api/usuario/:id',
        method: 'get',
        controller: controller.buscarUsuario
    },
    {
        route: '/api/usuario/:id',
        method: 'put',
        controller: controller.atualizarUsuario
    },
    {
        route: '/api/usuario/:id',
        method: 'delete',
        controller: controller.excluirUsuario
    }
];