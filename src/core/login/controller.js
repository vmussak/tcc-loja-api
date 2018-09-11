const repository = require('./repository'),
    { colorize } = require('../../api/helpers/color');

module.exports = {
    buscaUsuarioLogin,
    efetuarLogin
};

async function buscaUsuarioLogin(req, res) {
    let usuario = await repository.buscaUsuarioLogin(req.params.login);

    if (!usuario)
        return res.error('Usuário não encontrado', 404);

    usuario.cor = colorize(usuario.id);

    res.ok(usuario);
}

async function efetuarLogin(req, res) {
    let usuario = await repository.buscarUsuarioLoginSenha(req.body);

    if (!usuario)
        return res.error('Senha incorreta', 404);

    usuario.cor = colorize(usuario.id);

    res.ok(usuario);
}


