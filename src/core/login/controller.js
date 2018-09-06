const repository = require('./repository');

module.exports = {
    buscaUsuarioLogin,
    efetuarLogin
};

async function buscaUsuarioLogin(req, res) {
    let usuario = await repository.buscaUsuarioLogin(req.params.login);

    if(!usuario)
        return res.error('Usuário não encontrado', 404);

    usuario.cor = cores[usuario.id];

    res.ok(usuario);
}

async function efetuarLogin(req, res) {
    res.ok({
        id: 1,
        nome: 'Vinicius Mussak',
        token: 'ARRAYYYYYYY'
    });
}


let cores = [
    "#00ACC1", "#FBC02D", "#5E35B1", "#1565C0", "#D81B60", "#F57C00", "#F4511E", "#00897B", "#FFC107",
    "#00695C", "#689F38", "#4CAF50", "#4527A0", "#03A9F4", "#546E7A", "#FFEB3B", "#43A047", "#9E9D24",
    "#F44336", "#9E9E9E", "#616161", "#512DA8", "#37474F", "#1976D2", "#2196F3", "#00796B", "#FF8F00",
    "#5D4037", "#C62828", "#283593", "#3F51B5", "#7CB342", "#9C27B0", "#6D4C41", "#8BC34A", "#E53935",
    "#F9A825", "#1E88E5", "#0097A7", "#795548", "#00BCD4", "#388E3C", "#039BE5", "#FDD835", "#455A64",
    "#558B2F", "#E91E63", "#8E24AA", "#E64A19", "#FB8C00", "#607D8B", "#C2185B", "#C0CA33", "#673AB7",
    "#303F9F", "#6A1B9A", "#FF5722", "#3949AB", "#D84315", "#FF9800", "#FFA000", "#0288D1", "#424242",
    "#00838F", "#2E7D32", "#AD1457", "#FFB300", "#757575", "#AFB42B", "#7B1FA2", "#CDDC39", "#4E342E",
    "#009688", "#0277BD", "#D32F2F", "#EF6C00"
];