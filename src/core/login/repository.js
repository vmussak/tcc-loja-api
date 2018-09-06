const settings = require('../../../config/settings'),
    pg = require('smn-pg')(settings.pg);

module.exports = {
    buscaUsuarioLogin
};

const procedures = {
    buscaUsuarioLogin: 'buscarUsuarioPorLogin'
};

async function buscaUsuarioLogin(login){
    return await pg.request()
        .input('pLogin', login)
        .asyncExecOne(procedures.buscaUsuarioLogin);
}