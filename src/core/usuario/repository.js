const settings = require('../../../config/settings'),
    pg = require('smn-pg')(settings.pg);

module.exports = {
    selecionarUsuario,
    buscarUsuario,
    inserirUsuario,
    atualizarUsuario,
    excluirUsuario,
    verificaExisteUsuario
};

const procedures = {
    selecionarUsuario: 'selecionarUsuario',
    buscarUsuario: 'buscarUsuario',
    inserirUsuario: 'inserirUsuario',
    atualizarUsuario: 'atualizarUsuario',
    excluirUsuario: 'excluirUsuario',
    verificaExisteUsuario: 'verificaExisteUsuario'
};

async function selecionarUsuario(filtro) {
    return await pg.request()
        .input('pFiltro', filtro)
        .asyncExecOne(procedures.selecionarUsuario);
}

async function buscarUsuario(id) {
    return await pg.request()
        .input('pId', id)
        .asyncExecOne(procedures.buscarUsuario);
}

async function inserirUsuario(usuario) {
    return await pg.request()
        .input('pNome', usuario.nome)
        .input('pLogin', usuario.login)
        .input('pSenha', usuario.senha)
        .asyncExecOne(procedures.inserirUsuario);
}

async function atualizarUsuario(usuario) {
    return await pg.request()
        .input('pId', usuario.id)
        .input('pNome', usuario.nome)
        .input('pLogin', usuario.login)
        .input('pSenha', usuario.senha)
        .asyncExecOne(procedures.atualizarUsuario);
}

async function excluirUsuario(id) {
    return await pg.request()
        .input('pId', id)
        .asyncExecOne(procedures.excluirUsuario);
}

async function verificaExisteUsuario(login) {
    return await pg.request()
        .input('pLogin', login)
        .asyncExecOne(procedures.verificaExisteUsuario);
}

