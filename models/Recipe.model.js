const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const currentDate = new Date();
const recipeSchema = new Schema({
  title: String,
  
  level: {
    type: String,
    enum: ['Easy Peasy', 'Amateur Chef', 'UltraPro Chef'],
  },
  
  ingredients: [ String ],
  
  cuisine: {
    type: String,
    required: true,
  },
  
  dishType: {
    type: String,
    enum: ['breakfast', 'main_course', 'soup', 'snack', 'drink', 'dessert', 'other']
  },

  image: {
    type: String,
    default: "https://images.media-allrecipes.com/images/75131.jpg",
  },

  duration: {
    type: Number,
    minimum: 0,
  },

  creator: String,

  created: {
    type: Date,
    default: currentDate,
  }
});

const Recipe = mongoose.model('Recipe', recipeSchema);

module.exports = Recipe;

