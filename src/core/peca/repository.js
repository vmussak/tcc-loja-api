const settings = require('../../../config/settings'),
    pg = require('smn-pg')(settings.pg);

module.exports = {
    selecionarPeca,
    buscarPeca,
    inserirPeca,
    atualizarPeca,
    excluirPeca,
    verificaExclusaoPeca
};

const procedures = {
    selecionarPeca: 'selecionarPeca',
    buscarPeca: 'buscarPeca',
    inserirPeca: 'inserirPeca',
    atualizarPeca: 'atualizarPeca',
    excluirPeca: 'excluirPeca',
    verificaExclusaoPeca: 'verificaExclusaoPeca'
};

async function selecionarPeca(filtro) {
    return await pg.request()
        .input('pFiltro', filtro)
        .asyncExecOne(procedures.selecionarPeca);
}

async function buscarPeca(id) {
    return await pg.request()
        .input('pId', id)
        .asyncExecOne(procedures.buscarPeca);
}

async function inserirPeca(peca) {
    return await pg.request()
        .input('pIdTipoPeca', peca.idTipoPeca)
        .input('pNome', peca.nome)
        .input('pTamanho', peca.tamanho)
        .input('pValor', peca.valor)
        .input('pCor', peca.cor)
        .input('pQuantidadeEstoque', peca.quantidadeEstoque)
        .asyncExecOne(procedures.inserirPeca);
}

async function atualizarPeca(peca) {
    return await pg.request()
        .input('pId', peca.id)
        .input('pIdTipoPeca', peca.idTipoPeca)
        .input('pNome', peca.nome)
        .input('pTamanho', peca.tamanho)
        .input('pValor', peca.valor )
        .input('pCor', peca.cor)
        .input('pQuantidadeEstoque', peca.quantidadeEstoque)
        .asyncExecOne(procedures.atualizarPeca);
}

async function excluirPeca(id) {
    return await pg.request()
        .input('pId', id)
        .asyncExecOne(procedures.excluirPeca);
}

async function verificaExclusaoPeca(id) {
    return await pg.request()
        .input('pId', id)
        .asyncExecOne(procedures.verificaExclusaoPeca);
}