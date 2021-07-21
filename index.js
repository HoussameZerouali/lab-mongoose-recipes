const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');
const recipeModel = mongoose.model("Recipe", Recipe.recipeSchema);
const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(self => {
    console.log(`Connected to the database: "${self.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany()
  })
  .then(() => {
    recipeModel.insertMany(data)
     .then((createdDocument) => {
      for (let i = 0; i< createdDocument.length; i++){
        console.log(createdDocument[i].title)
      }  
      
     })
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });
