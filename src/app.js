const express = require('express'),
    app = express(),
    helmet = require('helmet'),
    bodyParser = require('body-parser'),
    cors = require('./api/middlewares/cors'),
    response = require('./api/middlewares/response'),
    errors = require('./api/middlewares/errors'),
    loadRoutes = require('./api/routes/init');

app.use(helmet());

app.use(cors);
app.use(response);

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ extended: true }));

loadRoutes(app);

app.use(errors.notFound);
app.use(errors.serverError);

const port = process.env.PORT || 4000;
app.listen(port, () => {
    console.log('o/ servidor rodando na porta:' + port);
});