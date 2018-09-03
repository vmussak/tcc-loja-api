module.exports = (app) => {
    app.get('/ping', (req, res) => {
        res.ok({
            date: new Date() 
        });
    });
}