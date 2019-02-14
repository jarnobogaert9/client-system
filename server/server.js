require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const app = express();
const port = process.env.PORT;
const mongoClient = require('mongodb').MongoClient;
const mongoURL = 'mongodb+srv://jarno_bogaert:Jarno0412@user-database-rovks.gcp.mongodb.net/test?retryWrites=true';

app.use(cors());
app.use(morgan('dev'));

let db;
// Connect to mongo db
mongoClient.connect(mongoURL, (err, client) => {
  if (err) return console.log(err);
  console.log('Connected to mongo db');
  db = client.db('user-database');
});

// Get all users in database
app.get('/users', (req, res) => {
  db.collection('users').find().toArray((err, results) => {
    if (err) {
      console.log(err);
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
    if (err) return console.log(err);
    console.log(result.ops);
    res.sendStatus(200);
  });
});

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
