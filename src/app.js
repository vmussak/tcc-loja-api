const express = require('express'),
    app = express(),
    helmet = require('helmet'),
    bodyParser = require('body-parser'),
    cors = require('./api/middlewares/cors'),
    response = require('./api/middlewares/response'),
    errors = require('./api/middlewares/errors'),
    loadRoutes = require('./api/routes/init'),
    reconhecimentoFacial = require('./api/services/reconhecimentoFacial'),
    fs = require('fs');

app.use(helmet());

app.use(cors);
app.use(response);

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ extended: true }));

loadRoutes(app);

app.get('/', async (req, res) => {
    let data = fs.readFileSync(`C:\\Users\\Vinicius Mussak\\Desktop\\testes-face\\1.jpg`);

    var payload = Buffer.concat([
        Buffer.from(data, "utf8")
    ]);

    let face = await reconhecimentoFacial.uploadFaceParaDeteccao(payload);
    
    let a = eu;

    res.status(200).json({a: 1});
});

app.use(errors.serverError);
app.use(errors.notFound);

const port = process.env.PORT || 4000;
app.listen(port, () => {
    console.log('o/ servidor rodando na porta:' + port);
});


