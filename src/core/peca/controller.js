const repository = require('./repository');

module.exports = {
    selecionarPeca,
    buscarPeca,
    inserirPeca,
    atualizarPeca,
    excluirPeca
};

async function selecionarPeca(req, res) {
    let pecas = await repository.selecionarPeca(req.query.filtro);

    pecas.forEach(item => {
        item.imagem = 'https://img.ijacotei.com.br/produtos/200/200/22/79/12037922.jpg'
    });

    res.ok(pecas);
}

async function buscarPeca(req, res) {
    let Peca = await repository.buscarPeca(req.params.id);

    if(!peca)
        return res.error('Peça não encontrada', 404);

    peca.imagem = 'https://img.ijacotei.com.br/produtos/200/200/22/79/12037922.jpg';
    res.ok(peca);
}

async function inserirPeca(req, res) {
    let peca = await repository.inserirPeca(req.body);

    //inserir imagem da peça

    res.ok(peca);
}

async function atualizarPeca(req, res) {
    let peca = await repository.atualizarPeca(req.body);

    if(req.body.imagem){
        //atualizar imagem da peça
    }

    res.ok(peca);
}

async function excluirPeca(req, res) {
    if(false) {
        //verifica se pode ser excluida
    }

    await repository.excluirPeca(req.params.id);
    res.ok();
}