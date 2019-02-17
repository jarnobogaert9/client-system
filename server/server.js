require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const app = express();
const port = process.env.PORT;
const mongoClient = require('mongodb').MongoClient;
const objectId = require('mongodb').ObjectID;
const mongoURL = 'mongodb+srv://jarno_bogaert:Jarno0412@user-database-rovks.gcp.mongodb.net/test?retryWrites=true';

app.use(cors());
app.use(morgan('dev'));

let db;
// Connect to mongo db
mongoClient.connect(mongoURL, { useNewUrlParser: true }, (err, client) => {
  if (err) return console.log(err);
  console.log('Connected to mongo db');
  db = client.db('user-database');
});

// Get all clients from database
app.get('/clients', (req, res) => {
  db.collection('users').find().toArray((err, results) => {
    if (err) {
      console.log(err);
      res.sendStatus(500);
      return;
    }
    res.send(results);
  });
});

// Insert client into database when doing post method to this route
app.post('/add/:name/:pwd', (req, res) => {
  // Get values of the url
  let name = req.params.name;
  let pwd = req.params.pwd;
  // Make literal object
  let client = {
    name: name,
    pwd: pwd
  }
  console.log(client);
  // Insert client
  db.collection('users').save(client, (err, result) => {
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
app.post('/update/:id/:name/:pwd', (req, res) => {
  let id = req.params.id;
  let name = req.params.name;
  let pwd = req.params.pwd;

  let client = {
    name: name,
    pwd: pwd
  }

  // objectId method is required to convert id to an object id (mongodb is strong typed) & the '$set' is also required because we need an atomic operator and now mongo db knows which part we will update
  db.collection('users').updateOne({"_id": objectId(id)},{$set: client}, (err) => {
    if (err) {
      console.log(err);
      return;
    }
    console.log(`Client with id = ${id} updated`);
    res.sendStatus(200);
  });
});


// Delete client when going to this route with specific id
app.post('/delete/:id', (req, res) => {
  let id = req.params.id;
  let item = {_id: objectId(id)};
  // Deletes the user
  db.collection('users').deleteOne(item, (err) => {
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
