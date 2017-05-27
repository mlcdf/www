module.exports = function (req, res, next) {
    var engine = res.app.get('engine');
    var config = req.app.get('config');

    engine.addGlobal('config', config);
    engine.addGlobal('request', req);

    next();
};
