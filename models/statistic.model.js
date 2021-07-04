const {Schema, model, Types} = require('mongoose')

const schema = new Schema({
  clicks: {type: Number, required: true, default: 0},
  correct: {type: Number, required: true, default: 0},
  wrong: {type: Number, required: true, default: 0},
  card_id: {type: String, required: true, default: 0},
})

module.exports = model('Statistic', schema)