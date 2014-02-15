var ArticleModel = require('../../models/article');

exports.articles = function(req, res) {
    ArticleModel.find(function (err, articles) {
        if (!err) {
            res.json(articles);
        }
        else {
            res.json('Error Retrieving Articles');
            console.log('Error retrieving articles:', err);
        }
    });
};

exports.article = function(req, res) {
    var id = req.params.id;
    if (id) {
        ArticleModel.findById(id, function(err, article) {
            if (!err) {
                res.json(article);
            }
            else {
                console.log('Error retrieving article:', err);
            }
        });
    }
    else {
        console.log('ID required to retrieve article');
    }
};

exports.create = function(req, res) {
    article = new ArticleModel({
        title: req.body.title,
        type: req.body.type,
        author: req.body.author,
        desc: req.body.desc,
        body: req.body.body
    });
    article.save(function(err) {
        if (!err) {
            res.json(true);
            console.log('Article created successfully at:', new Date().getTime());
        }
        else {
            res.json(false);
            console.log('Error creating article:', err);
        }
    });
    return res.jsonp(req.body);
};

exports.edit = function(req, res) {
    var id = req.params.id;
    if (id) {
        ArticleModel.findById(id, function(err, article) {
            if (!err) {
                article.title = req.body.title;
                article.type = req.body.type;
                article.author = req.body.author;
                article.desc = req.body.desc;
                article.body = req.body.body;
                article.save(function(err) {
                    if (!err) {
                        console.log('Article ID:' + id + ' updated');
                    }
                    else {
                        console.log('Error updating article:', err);
                    }
                    return res.send(article);
                });
            }
            else {
                console.log('Error updating article:', err);
            }
        });
    }
    else {
        console.log('ID required to update article');
    }
};

exports.remove = function(req, res) {
    var id = req.params.id;
    if (id) {
        ArticleModel.findById(id, function(err, article) {
            if (!err) {
                article.remove(function(err) {
                    if (!err) {
                        console.log('Article ' + id + ' removed');
                        return res.send('');
                    }
                    else {
                        console.log('Error removing article', err);
                    }
                });
            }
            else {
                console.log('Error finding article', err);
            }
        });
    }
    else {
        console.log('ID required to remove article');
    }
};

