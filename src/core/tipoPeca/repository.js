const settings = require('../../../config/settings'),
    pg = require('smn-pg')(settings.pg);

module.exports = {
    selecionarTipoPeca
};

const procedures = {
    selecionarTipoPeca: 'selecionarTipoPeca'
};

async function selecionarTipoPeca(){
    return await pg.request()
        .asyncExecOne(procedures.selecionarTipoPeca);
}