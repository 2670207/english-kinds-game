const {Schema, model, Types} = require('mongoose')

const schema = new Schema({
  name: {type: String, required: true},
  cards: [{type: Types.ObjectId, ref: 'Card'}]
})

module.exports = model('Category', schema)
