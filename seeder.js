const mongoose = require('mongoose')
const config = require('config')
//import products from './data/categories.seeder'
//import Product from './models/category.model'
//import connectDB from './config/db.js'
const categoryModel = require('./models/category.model');
const cardModel = require('./models/card.model');
const categorySeeder = require('./data/categories.seeder');
const cardsSeeder = require('./data/cards.seeder');

const PORT = config.get('port') || 5000

async function start() {
  try {
    await mongoose.connect(config.get('mongoUri'), {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true
    })
    
    await categoryModel.deleteMany();
    await cardModel.deleteMany();

    const createdCategories = await categoryModel.insertMany(categorySeeder)
    
    insertingCards = createdCategories.map((category, index) => {
        presetCards = cardsSeeder.find((preset, presetIndex) => presetIndex === index);
            return presetCards.map((card) => {
                return {...card,...{category: category._id}};
            }) 
    })
    
    for(let i = 0; i <= insertingCards.length - 1; i++){
        const result = await cardModel.insertMany(insertingCards[i])
    }
    process.exit();
  
  } catch (e) {
    console.log('Server Error', e.message)
    process.exit(1)
  }
}

start()