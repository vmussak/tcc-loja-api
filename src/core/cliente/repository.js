const settings = require('../../../config/settings'),
    pg = require('smn-pg')(settings.pg);

module.exports = {
    selecionarCliente,
    buscarCliente,
    inserirCliente,
    atualizarCliente,
    excluirCliente,
    verificaExisteCliente,
    verificaExclusaoCliente,
    atualizarFaceId,
    buscarClienteFaceId
};

const procedures = {
    selecionarCliente: 'selecionarCliente',
    buscarCliente: 'buscarCliente',
    inserirCliente: 'inserirCliente',
    atualizarCliente: 'atualizarCliente',
    excluirCliente: 'excluirCliente',
    verificaExisteCliente: 'verificaExisteCliente',
    verificaExclusaoCliente: 'verificaExclusaoCliente',
    atualizarFaceId: 'atualizarFaceId',
    buscarClienteFaceId: 'buscarClienteFaceId'
};

async function selecionarCliente(filtro) {
    return await pg.request()
        .input('pFiltro', filtro)
        .asyncExecOne(procedures.selecionarCliente);
}

async function buscarCliente(id) {
    return await pg.request()
        .input('pId', id)
        .asyncExecOne(procedures.buscarCliente);
}

async function inserirCliente(cliente) {
    return await pg.request()
        .input('pNome', cliente.nome)
        .input('pCpf', cliente.cpf)
        .input('pDataNascimento', cliente.dataNascimento)
        .input('pEmail', cliente.email)
        .input('pTelefone', cliente.telefone)
        .asyncExecOne(procedures.inserirCliente);
}

async function atualizarFaceId(id, faceId) {
    return await pg.request()
        .input('pId', id)
        .input('pFaceId', faceId)
        .asyncExecOne(procedures.atualizarFaceId);
}

async function atualizarCliente(cliente) {
    return await pg.request()
        .input('pId', cliente.id)
        .input('pNome', cliente.nome)
        .input('pCpf', cliente.cpf)
        .input('pDataNascimento', cliente.dataNascimento)
        .input('pEmail', cliente.email)
        .input('pTelefone', cliente.telefone)
        .asyncExecOne(procedures.atualizarCliente);
}

async function excluirCliente(id) {
    return await pg.request()
        .input('pId', id)
        .asyncExecOne(procedures.excluirCliente);
}

async function verificaExisteCliente(cpf) {
    return await pg.request()
        .input('pCpf', cpf)
        .asyncExecOne(procedures.verificaExisteCliente);
}

async function verificaExclusaoCliente(id) {
    return await pg.request()
        .input('pId', id)
        .asyncExecOne(procedures.verificaExclusaoCliente);
}

async function buscarClienteFaceId(id) {
    return await pg.request()
        .input('pId', id)
        .asyncExecOne(procedures.buscarClienteFaceId);
}
