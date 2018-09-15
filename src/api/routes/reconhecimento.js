const controller = require('../../core/reconhecimento/controller');

module.exports = (app) => {

    app.route('/api/reconhecimento')
        .post(controller.reconhecerCliente);

}