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

// Get all users in database
app.get('/users', (req, res) => {
  db.collection('users').find().toArray((err, results) => {
    if (err) {
      console.log(err);
      res.sendStatus(500);
      return;
    }

    res.send(results);
  });
});

// Insert user into database when doing post method to this route
app.post('/add/:name/:pwd', (req, res) => {
  // Get values of the url
  let name = req.params.name;
  let pwd = req.params.pwd;
  // Make literal object
  let user = {
    name: name,
    pwd: pwd
  }
  console.log(user);
  // Insert user
  db.collection('users').save(user, (err, result) => {
    if (err) {
      console.log(err);
      res.sendStatus(500);
      return;
    }
    console.log(result.ops);
    res.sendStatus(200);
  });
});

// Update user in database
app.post('/update/:id/:name/:pwd', (req, res) => {
  let id = req.params.id;
  let name = req.params.name;
  let pwd = req.params.pwd;

  let item = {
    name: name,
    pwd: pwd
  }

  // objectId method is required to convert it to an object id (mongodb is strong typed) & the '$set' is also required because we need an atomic operator and now mongo db knows which part that will be updated
  db.collection('users').updateOne({"_id": objectId(id)},{$set: item}, (err) => {
    if (err) {
      console.log(err);
      return;
    }
    res.sendStatus(200);
    console.log(`User with id = ${id} updated`);
  });
});

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
