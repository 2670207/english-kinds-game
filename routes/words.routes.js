const {Router} = require('express')
const router = Router()
const StatisticModel = require("../models/statistic.model");
const CardModel = require("../models/card.model");
const CategoryModel = require("../models/category.model");


const sort = (data, prop, isAsc) => {
  return data.sort((a, b) => {
      return (a[prop] < b[prop] ? -1 : 1) * (isAsc ? 1 : -1)
  });
}

router.get('/words/clicks/:card_id',  async (req, res) => {
    try {

      const card = await CardModel.findById(req.params.card_id);
      const statistic = await StatisticModel.findOne({card_id:card._id});

      if(statistic){        
        
        await StatisticModel.update({ _id : statistic._id }, { clicks: Number.parseInt(statistic.clicks) + 1 });

      }else{
        const model = new StatisticModel({card_id: card._id, clicks: 1})
        model.save();
      }
      res.json(statistic)
      
      
    } catch (e) {
      res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова: ' + e.message })
    }
});
router.get('/words/correct/:card_id',  async (req, res) => {
  try {

    const card = await CardModel.findById(req.params.card_id);
    const statistic = await StatisticModel.findOne({card_id:card._id});

    if(statistic){        
      
      await StatisticModel.update({ _id : statistic._id }, { correct: Number.parseInt(statistic.correct) + 1 });

    }else{
      const model = new StatisticModel({card_id: card._id, correct: 1})
      model.save();
    }
    res.json(statistic)
    
    
  } catch (e) {
    res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова: ' + e.message })
  }
});
router.get('/words/wrong/:card_id',  async (req, res) => {
  try {

    const card = await CardModel.findById(req.params.card_id);
    const statistic = await StatisticModel.findOne({card_id:card._id});

    if(statistic){        
      
      await StatisticModel.update({ _id : statistic._id }, { wrong: Number.parseInt(statistic.wrong) + 1 });

    }else{
      const model = new StatisticModel({card_id: card._id, wrong: 1})
      model.save();
    }
    res.json(statistic)
    
    
  } catch (e) {
    res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова: ' + e.message })
  }
});

router.get('/words/statistics', async (req, res) => {
  try {
    const cards = await CardModel.find();
    const statistics = await StatisticModel.find();
    const categories = await CategoryModel.find();

    const result = cards.map((card) => {
      const statisticForWord = statistics.find((statistic) => card._id.toString() === statistic.card_id.toString());
      const categoryWord = categories.find((category) => category._id.toString() === card.category.toString())
        let perSent = 0;

        if(statisticForWord !== undefined &&  statisticForWord.wrong){
           perSent = parseFloat(statisticForWord.wrong/(statisticForWord.wrong + statisticForWord.correct)*100).toFixed(2);
        }

        return {...card.toObject(), ...{
          clicks: Number.parseInt(statisticForWord !== undefined ? statisticForWord.clicks : 0),
          correct: Number.parseInt(statisticForWord !== undefined ? statisticForWord.correct : 0),
          wrong: Number.parseInt(statisticForWord !== undefined ? statisticForWord.wrong : 0),
          category:  categoryWord.name,
          perSent: perSent,
          
         }};

    })

    sort(result, req.query.field, req.query.order === 'asc' ? true : false);
    slice = result.slice(0, 8)

    req.query.game !== 'y' ? res.json(result) :  res.json(slice.filter((card) => card.perSent));
    
  } catch (e) {
    res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова: ' + e.message })
  }
})
router.get('/words/statistics/reset',  async (req, res) => {
  try {
    await StatisticModel.deleteMany({});

    const cards = await CardModel.find();
    const statistics = await StatisticModel.find();
    const categories = await CategoryModel.find();

    const result = cards.map((card) => {
      const statisticForWord = statistics.find((statistic) => card._id.toString() === statistic.card_id.toString());
      const categoryWord = categories.find((category) => category._id.toString() === card.category.toString())
        let perSent = 0;

        if(statisticForWord !== undefined &&  statisticForWord.wrong){
           perSent = parseFloat(statisticForWord.wrong/(statisticForWord.wrong + statisticForWord.correct)*100).toFixed(2);
        }

        return {...card.toObject(), ...{
          clicks: Number.parseInt(statisticForWord !== undefined ? statisticForWord.clicks : 0),
          correct: Number.parseInt(statisticForWord !== undefined ? statisticForWord.correct : 0),
          wrong: Number.parseInt(statisticForWord !== undefined ? statisticForWord.wrong : 0),
          category:  categoryWord.name,
          perSent: perSent,
          
         }};

    })

    sort(result, req.query.field, req.query.order === 'asc' ? true : false);
    res.json(result);
    
  } catch (e) {
    res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова: ' + e.message })
  }
});
module.exports = router