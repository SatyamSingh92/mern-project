const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const bookRoutes = require('./routes/books');

const app = express();

<<<<<<< HEAD
app.use(cors()); 
app.use(bodyParser.json()); 

=======

app.use(cors()); 
app.use(bodyParser.json()); 


>>>>>>> dc1facd (changes)
mongoose.connect('mongodb://localhost:27017/bookSchema', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Connected to MongoDB');
}).catch((error) => {
  console.error('Error connecting to MongoDB:', error);
});

<<<<<<< HEAD
// Routes
app.use('/api', bookRoutes);

=======

app.use('/api', bookRoutes);
>>>>>>> dc1facd (changes)

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

<<<<<<< HEAD
// Start the server
=======

>>>>>>> dc1facd (changes)
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});