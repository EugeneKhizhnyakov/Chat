const {Schema, model, Types} = require('mongoose');

const schema = new Schema({
    _id:  { type: String, required: true },
    message:[{type: Types.ObjectId, ref: 'Message'}]
})

module.exports = model('Room', schema)