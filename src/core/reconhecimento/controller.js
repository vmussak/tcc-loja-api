const repository = require('./repository'),
    azureStorage = require('../../api/helpers/azure-blob'),
    reconhecimentoFacial = require('../../api/services/reconhecimentoFacial');

const BLOB_URL = 'https://tccmussak.blob.core.windows.net/reconhecimento';
const BLOB_URL_CLIENTE = 'https://tccmussak.blob.core.windows.net/cliente';

module.exports = {
    reconhecerCliente
};

async function reconhecerCliente(req, res) {
    let imageName = `${new Date().getTime()}.jpg`;
    await azureStorage.upload('reconhecimento', imageName, req.body.imagem);

    let face = await reconhecimentoFacial.uploadFaceParaDeteccao(imageName);

    let detectedFaceIds = await reconhecimentoFacial.verificarFace(face[0].faceId);

    if(!detectedFaceIds.length)
        return res.error('Nenhum cliente encontrado', 404);

    let cliente = await repository.reconhecerCliente(detectedFaceIds[0].persistedFaceId);

    if(!cliente)
        return res.error('Nenhum cliente encontrado', 404);

    cliente.imagem = `${BLOB_URL_CLIENTE}/${cliente.id}.jpg`;
    cliente.imagemAtual = `${BLOB_URL}/${imageName}`;

    cliente.ultimasCompras = [];
    cliente.sugestaoCompras = [];

    res.ok(cliente);
}


