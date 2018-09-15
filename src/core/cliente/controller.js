const repository = require('./repository'),
    { colorize } = require('../../api/helpers/color'),
    azureStorage = require('../../api/helpers/azure-blob'),
    reconhecimentoFacial = require('../../api/services/reconhecimentoFacial');

const BLOB_URL = 'https://tccmussak.blob.core.windows.net/cliente';

module.exports = {
    selecionarCliente,
    buscarCliente,
    inserirCliente,
    atualizarCliente,
    excluirCliente
};

async function selecionarCliente(req, res) {
    let clientes = await repository.selecionarCliente(req.query.filtro);

    if (!clientes) clientes = [];
    clientes.forEach(item => {
        item.cor = colorize(item.id);
        item.imagem = `${BLOB_URL}/${item.id}.jpg`
    });

    res.ok(clientes);
}

async function buscarCliente(req, res) {
    let cliente = await repository.buscarCliente(req.params.id);

    if (!cliente)
        return res.error('Cliente não encontrado', 404);

    cliente.cor = colorize(cliente.id);
    cliente.imagem = `${BLOB_URL}/${cliente.id}.jpg`

    res.ok(cliente);
}

async function inserirCliente(req, res) {
    let clienteDb = await repository.verificaExisteCliente(req.body.cpf);

    if (clienteDb)
        return res.error('Já existe um cliente com esse CPF', 406);

    let cliente = await repository.inserirCliente(req.body);

    await _atualizarReconhecimentoFacial(cliente, req.body.novaImagem);

    res.ok(cliente);
}

async function atualizarCliente(req, res) {
    let clienteDb = await repository.verificaExisteCliente(req.body.cpf);

    if (clienteDb && clienteDb != req.params.id)
        return res.error('Já existe um cliente com esse CPF', 406);

    let imagem = req.body.novaImagem;
    if (imagem) {
        await _atualizarReconhecimentoFacial(cliente, imagem);
    }

    let cliente = await repository.atualizarCliente(req.body);
    res.ok(cliente);
}

async function _atualizarReconhecimentoFacial(idCliente, imagem) {
    let imageName = `${idCliente}.jpg`;
    await azureStorage.upload('cliente', imageName, imagem);

    let face = await reconhecimentoFacial.uploadImagem(imageName);
    let faceId = face.persistedFaceId;

    await repository.atualizarFaceId(idCliente, faceId);

    reconhecimentoFacial.treinarReconhecimento();
}

async function excluirCliente(req, res) {
    if (await repository.verificaExclusaoCliente(req.params.id)) {
        return res.error('Cliente já possui venda vinculada', 406);
    }

    await azureStorage.deleteBlob('cliente', req.params.id);

    let cliente = await repository.buscarClienteFaceId(req.params.id);
    if(cliente) {
        await reconhecimentoFacial.removerDaLista(cliente.faceId);
    }

    await repository.excluirCliente(req.params.id);
    res.ok();
}