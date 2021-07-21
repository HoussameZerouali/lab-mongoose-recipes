const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');
const recipeModel = mongoose.model("Recipe", Recipe.recipeSchema);
const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

const yummyFood = {
  title: "Yummy Recipe",
  level: "UltraPro Chef",
  ingredients: ["Good Juice", "Nice Fruits", "Excellent Vegetables"],
  cuisine: "Spanish",
  dishType: "main_course",
  duration: 120,
  creator: "Me",
};

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(self => {
    console.log(`Connected to the database: "${self.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany()
  })
  .then(() => {
    recipeModel.create(yummyFood)
    recipeModel.insertMany(data)
     .then((createdDocument) => {
      for (let i = 0; i< createdDocument.length; i++){
        console.log(createdDocument[i].title)
      }
      
     }).then(() => {
      recipeModel.findOneAndUpdate(
      {title: "Rigatoni alla Genovese"},
      {duration: 100}
    ).then((updatedDocument) => {
      console.log("Updated document ====>", updatedDocument);
    })
      })
      .catch((error) => {
        console.log(error);
      });
      

     
  })
  .catch((error) => {
    console.log(error);
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });

  
