const settings = require('../../../config/settings'),
    pg = require('smn-pg')(settings.pg);

module.exports = {
    buscaUsuarioLogin,
    buscarUsuarioLoginSenha
};

const procedures = {
    buscaUsuarioLogin: 'buscarUsuarioPorLogin',
    buscarUsuarioLoginSenha: 'buscarUsuarioPorLoginSenha'
};

async function buscaUsuarioLogin(login){
    return await pg.request()
        .input('pLogin', login)
        .asyncExecOne(procedures.buscaUsuarioLogin);
}

async function buscarUsuarioLoginSenha(dados) {
    return await pg.request()
        .input('pLogin', dados.login)
        .input('pSenha', dados.senha)
        .asyncExecOne(procedures.buscarUsuarioLoginSenha);
}