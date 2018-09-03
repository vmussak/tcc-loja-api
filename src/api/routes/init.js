async function loadRoutes(app) {
    require('./ping')(app);
    require('./login')(app);
    //mais rotas aqui

}


module.exports = loadRoutes;