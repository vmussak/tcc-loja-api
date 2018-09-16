const repository = require('./repository'),
    azureStorage = require('../../api/helpers/azure-blob'),
    reconhecimentoFacial = require('../../api/services/reconhecimentoFacial');

const BLOB_URL = 'https://tccmussak.blob.core.windows.net/reconhecimento';
const BLOB_URL_CLIENTE = 'https://tccmussak.blob.core.windows.net/cliente';
const BLOB_URL_PECA = 'https://tccmussak.blob.core.windows.net/peca';

module.exports = {
    reconhecerCliente,
    buscarClientePorVisita
};

async function reconhecerCliente(req, res) {
    let imageName = `${new Date().getTime()}.jpg`;
    await azureStorage.upload('reconhecimento', imageName, req.body.imagem);

    let face = await reconhecimentoFacial.uploadFaceParaDeteccao(imageName);

    if(!face)
        return res.error('Nenhuma face encontrada', 404);

    let detectedFaceIds = await reconhecimentoFacial.verificarFace(face[0].faceId);

    if (!detectedFaceIds.length)
        return res.error('Nenhum cliente encontrado', 404);

    let cliente = await repository.reconhecerCliente(detectedFaceIds[0].persistedFaceId);

    if (!cliente)
        return res.error('Nenhum cliente encontrado', 404);

    let idVisita = await repository.registrarVisitaCliente(cliente.id, imageName);
    cliente.idVisita = idVisita;

    res.ok(cliente);
}

async function buscarClientePorVisita(req, res) {
    let cliente = await repository.buscarClientePorVisita(req.params.idVisita);

    if(!cliente)
        return res.error('Dados do cliente não encontrados', 404);

    cliente.imagem = `${BLOB_URL_CLIENTE}/${cliente.id}.jpg`;
    cliente.imagemAtual = `${BLOB_URL}/${cliente.imagemVisita}`;

    if(cliente.itensVenda)
        cliente.itensVenda.forEach((item) => {
            item.imagem = `${BLOB_URL_PECA}/${item.id}.jpg`
        });

    res.ok(cliente);
}


