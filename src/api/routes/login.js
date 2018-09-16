const controller = require('../../core/login/controller');

module.exports = [
    {
        route: '/api/login/:login',
        method: 'get',
        controller: controller.buscaUsuarioLogin
    },
    {
        route: '/api/login',
        method: 'post',
        controller: controller.efetuarLogin
    }
];

