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

// Create a schema for the Castingcalldescription Details
const castingDetailsSchema = new mongoose.Schema({
  title: String,
  role: [String],
  organizer_name: String,
  casting_call_for: [String],
  languages: [String],
  castingcallExpDate: Date
});

// Create a model based on the schema
const CastingDetails = mongoose.model('CastingDetails', castingDetailsSchema);

app.use(express.urlencoded({extended:false}));

// API endpoint to store the Crew Details
app.get('/casting', (req, res) => {
  console.log("inside", req.params)
  res.send('Details saved successfully');
})

app.post('/Castingcalldescription', (req, res) => {
  const { title, role, organizer_name, casting_call_for, languages, castingcallExpDate} = req.body;

  console.log(req.body);

  // Create a new document using the model
  const newCastingDetails = new CastingDetails({
    title,
    role,
    organizer_name,
    casting_call_for,
    languages,
    castingcallExpDate: new Date(castingcallExpDate)
  });

  // Save the document to the database
  newCastingDetails.save((err) => {
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
