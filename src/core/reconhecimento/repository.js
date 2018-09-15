const settings = require('../../../config/settings'),
    pg = require('smn-pg')(settings.pg);

module.exports = {
    reconhecerCliente
};

const procedures = {
    reconhecerCliente: 'reconhecerCliente'
};

async function reconhecerCliente(faceId){
    return await pg.request()
        .input('pFaceId', faceId)
        .asyncExecOne(procedures.reconhecerCliente);
}