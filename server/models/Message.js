const {Schema, model, Types} = require('mongoose');

const schema = new Schema({
    text: {type: String},
    userName: {type: String},
    owner:{type: String}
})

module.exports = model('Message', schema)