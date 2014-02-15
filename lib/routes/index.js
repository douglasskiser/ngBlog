var index = require('./handlers'),
    partials = require('./handlers/partials'),
    api = require('./resources/api'),
    auth = require('./resources/auth'),
    mail = require('./resources/mail'),
    status = require('./handlers/status'),
    passport = require('passport');

module.exports = function(app) {
    app.get('/', index.index);
    app.get('/partials/:fileName', partials.index);
    // Auth Routes
    app.post('/register', auth.register);
    app.post('/login', passport.authenticate('local'), auth.login);
    app.get('/loggedin', auth.loggedin);
    app.post('/logout', auth.logout);
    // Main Route
    app.post('/contact', mail.index);
    // API Routes
    app.namespace('/api', function() {
        app.get('/status', status.index);
        app.namespace('/articles', function() {
            app.get('/', api.articles);
            app.post('/', api.create);
            app.get('/:id', api.article);
            app.put('/:id', api.edit);
            app.delete('/:id', api.remove);
        });
    });
};