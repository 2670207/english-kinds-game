const {Schema, model, Types} = require('mongoose')

const schema = new Schema({
    word: {type: String, required: true},
    translation: {type: String, required: true},
    image: {type: String, required: true},
    audioSrc: {type: String, required: true},
    category: {type: Types.ObjectId, ref: 'Category'}
})
 
module.exports = model('Card', schema)
