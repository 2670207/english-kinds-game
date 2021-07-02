const {Router} = require('express')
const router = Router()

const Category = require("../models/category.model");
const cardModel = require("../models/card.model");

router.get('/categories',  async (req, res) => {
    try {
      const categories = await Category.find({});
      
      res.json(categories)
    } catch (e) {
      res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
    }
});
router.get('/categories/words/:id',  async (req, res) => {
  try {
    let cards = await cardModel.find({category: req.params.id })
    res.json(cards);
  } catch (e) {
    res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
  }
});




module.exports = router