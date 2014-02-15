var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
var ArticleSchema = new Schema({
    title: { type: String },
    type: { type: String },
    author: { type: String },
    desc: { type: String },
    body: { type: String },
    createdOn : {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Article', ArticleSchema);