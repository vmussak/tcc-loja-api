const repository = require('./repository'),
    azure = require('../../api/helpers/azure-blob');

const BLOB_URL = 'https://tccmussak.blob.core.windows.net/peca';

module.exports = {
    selecionarPeca,
    buscarPeca,
    inserirPeca,
    atualizarPeca,
    excluirPeca
};

async function selecionarPeca(req, res) {
    let pecas = await repository.selecionarPeca(req.query.filtro);

    if (!pecas) pecas = [];
    pecas.forEach(item => {
        item.imagem = `${BLOB_URL}/${item.id}.jpg`
    });

    res.ok(pecas);
}

async function buscarPeca(req, res) {
    let peca = await repository.buscarPeca(req.params.id);

    if (!peca)
        return res.error('Peça não encontrada', 404);

    peca.imagem = `${BLOB_URL}/${peca.id}.jpg`
    res.ok(peca);
}

async function inserirPeca(req, res) {
    let peca = await repository.inserirPeca(req.body);

    await azure.upload('peca', `${peca}.jpg`, req.body.novaImagem);

    res.ok(peca);
}

async function atualizarPeca(req, res) {
    let peca = await repository.atualizarPeca(req.body);

    let imagem = req.body.novaImagem;
    if (imagem) {
        await azure.upload('peca', `${req.params.id}.jpg`, imagem)
    }

    res.ok(peca);
}

async function excluirPeca(req, res) {
    if (await repository.verificaExclusaoPeca(req.params.id)) {
        return res.error('Peça já foi utilizada em compra', 406);
    }

    await azure.deleteBlob('peca', req.params.id);

    await repository.excluirPeca(req.params.id);
    res.ok();
}