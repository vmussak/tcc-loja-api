const repository = require('./repository');

module.exports = {
    selecionarUsuario,
    buscarUsuario,
    inserirUsuario,
    atualizarUsuario,
    excluirUsuario
};

async function selecionarUsuario(req, res) {
    let usuarios = await repository.selecionarUsuario(req.query.filtro);
    res.ok(usuarios);
}

async function buscarUsuario(req, res) {
    let usuario = await repository.selecionarUsuario(req.params.id);
    res.ok(usuario);
}

async function inserirUsuario(req, res) {
    let usuarioDb = await repository.verificaExisteUsuario(req.body.login);

    if(usuarioDb)
        return res.error('Já existe um usuário com esse login');

    let usuario = await repository.inserirUsuario(req.body);
    res.ok(usuario);
}

async function atualizarUsuario(req, res) {
    let usuarioDb = await repository.verificaExisteUsuario(req.body.login);

    if(usuarioDb && usuarioDb != req.params.id)
        return res.error('Já existe um usuário com esse login');

    let usuario = await repository.atualizarUsuario(req.body);
    res.ok(usuario);
}

async function excluirUsuario(req, res) {
    await repository.excluirUsuario(req.params.id);
    res.ok();
}