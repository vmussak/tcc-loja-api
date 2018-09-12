async function loadRoutes(app) {
    require('./ping')(app);
    require('./login')(app);
    require('./usuario')(app);
    require('./tipoPeca')(app);
}


module.exports = loadRoutes;