const {Router} = require('express')
const router = Router()

const CategoryModel = require("../models/category.model");
const CardModel = require("../models/card.model");

router.get('/categories',  async (req, res) => {
    try {

      const categories =  await CategoryModel.find();
      const cards = await CardModel.find()
    
      const result = categories.map((category) => {
          const cardsForCategory = cards.filter((card) => category._id.toString() === card.category.toString());
          return {...category.toObject(), ...{items: cardsForCategory}}
      });
    
      res.json(result)
      
      
    } catch (e) {
      res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова: ' + e.message })
    }
});
router.get('/categories/words/:id',  async (req, res) => {
  try {

    let cards = await CardModel.find({category: req.params.id })
    res.json(cards);
  } catch (e) {
    res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова: ' + e.message })
  }
});




module.exports = router