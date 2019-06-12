require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const app = express();
const port = process.env.PORT;
const mongoClient = require('mongodb').MongoClient;
const objectId = require('mongodb').ObjectID;
//const mongoURL = 'mongodb+srv://admin:admin@client-system-qxci4.mongodb.net/test?retryWrites=true&w=majority';
const mongoURL = 'mongodb+srv://admin:admin@clients-tolyx.gcp.mongodb.net/test?retryWrites=true&w=majority';


app.use(cors());
app.use(morgan('dev'));
app.use(express.urlencoded({extended: true}));
app.use(express.json());

let db;
// Connect to mongo db
mongoClient.connect(mongoURL, { useNewUrlParser: true }, (err, client) => {
  if (err) return console.log(err);
  console.log('Connected to mongo db');
  db = client.db('clients');
});

// Get all clients from database
app.get('/clients', (req, res) => {
  db.collection('clients').find().toArray((err, results) => {
    if (err) {
      console.log(err);
      res.sendStatus(500);
      return;
    }
    res.send(results);
  });
});

// Insert client into database when doing post method to this route
app.post('/add', (req, res) => {
  // Get values of the url
  let name = req.body.name;
  let email = req.body.email;
  // Make literal object
  let client = {
    name: name,
    email: email
  }
  console.log(client);
  
  // Insert client
  db.collection('clients').save(client, (err, result) => {
    if (err) {
      console.log(err);
      res.sendStatus(500);
      return;
    }
    console.log(result.ops);
    res.sendStatus(200);
  });
});

// Update client in database
app.post('/update/:id', (req, res) => {
  let id = req.params.id;
  let name = req.body.name;
  let email = req.body.email;

  let client = {
    name: name,
    email: email
  }

  // objectId method is required to convert id to an object id (mongodb is strong typed) & the '$set' is also required because we need an atomic operator and now mongo db knows which part we will update
  db.collection('clients').updateOne({"_id": objectId(id)},{$set: client}, (err) => {
    if (err) {
      console.log(err);
      return;
    }
    console.log(`Client with id = ${id} updated`);
    res.sendStatus(200);
  });
});


// Delete client when going to this route with specific id
app.get('/delete/:id', (req, res) => {
  let id = req.params.id;
  let item = {_id: objectId(id)};
  // Deletes the user
  db.collection('clients').deleteOne(item, (err) => {
    if (err) {
      console.log(err);
      return;
    }
    console.log('Removed client');
    res.sendStatus(200);
  });
});

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
