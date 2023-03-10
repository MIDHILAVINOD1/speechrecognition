const { urlencoded } = require('express');
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors')
const app = express();
const PORT = 3000;
app.use(cors())
// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/my_database', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Create a schema for the Crew Details
const crewDetailsSchema = new mongoose.Schema({
  name: String,
  profession: String,
  movies_acted_on: [String],
  languages_speaks: [String],
  industry: String,
  awards_and_achievements: [String]
});

// Create a model based on the schema
const CrewDetails = mongoose.model('CrewDetails', crewDetailsSchema);

app.use(express.urlencoded({extended:false}));

// API endpoint to store the Crew Details
app.get('/crew', (req, res) => {
  console.log("inside", req.params)
  res.send('Details saved successfully');
})

app.post('/Crewdescription', (req, res) => {
  const { name, profession, movies_acted_on, languages_speaks, industry, awards_and_achievements } = req.body;

  console.log(req.body);

  // Create a new document using the model
  const newCrewDetails = new CrewDetails({
    name,
    profession,
    movies_acted_on,
    languages_speaks,
    industry,
    awards_and_achievements
  });

  // Save the document to the database
  newCrewDetails.save((err) => {
    if (err) {
      console.log(err);
      res.status(500).send('Error while saving the details to database');
    } else {
      res.send('Details saved successfully');
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
