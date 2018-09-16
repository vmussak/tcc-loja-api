const settings = require('../../../config/settings'),
    pg = require('smn-pg')(settings.pg);

module.exports = {
    reconhecerCliente,
    registrarVisitaCliente,
    buscarClientePorVisita
};

const procedures = {
    reconhecerCliente: 'reconhecerCliente',
    registrarVisitaCliente: 'registrarVisitaCliente',
    buscarClientePorVisita: 'buscarClientePorVisita'
};

async function reconhecerCliente(faceId){
    return await pg.request()
        .input('pFaceId', faceId)
        .asyncExecOne(procedures.reconhecerCliente);
}

async function registrarVisitaCliente(idCliente, imagem){
    return await pg.request()
        .input('pIdCliente', idCliente)
        .input('pImagem', imagem)
        .asyncExecOne(procedures.registrarVisitaCliente);
}

async function buscarClientePorVisita(idVisita){
    return await pg.request()
        .input('pIdVisita', idVisita)
        .asyncExecOne(procedures.buscarClientePorVisita);
}