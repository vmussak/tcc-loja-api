const repository = require('./repository');

module.exports = {
    selecionarTipoPeca
};

async function selecionarTipoPeca(req, res) {
    let tiposPeca = await repository.selecionarTipoPeca();

    res.ok(tiposPeca);
}


