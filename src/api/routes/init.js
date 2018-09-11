async function loadRoutes(app) {
    require('./ping')(app);
    require('./login')(app);
    require('./usuario')(app);
    //mais rotas aqui

}


module.exports = loadRoutes;