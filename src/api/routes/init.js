async function loadRoutes(app) {
    require('./ping')(app);
    require('./login')(app);
    require('./usuario')(app);
    require('./tipoPeca')(app);
    require('./peca')(app);
    require('./cliente')(app);
}


module.exports = loadRoutes;