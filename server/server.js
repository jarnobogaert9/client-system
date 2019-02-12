require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.PORT;
const mongoClient = require('mongodb').MongoClient;
const mongoURL = 'mongodb+srv://jarno_bogaert:Jarno0412@user-database-rovks.gcp.mongodb.net/test?retryWrites=true';

let db;
// Connect to mongo db
mongoClient.connect(mongoURL, (err, client) => {
  if (err) return console.log(err);
  console.log('Connected to mongo db');
  db = client.db('user-database');
});

app.get('/', (req, res) => {
  db.collection('users').find().toArray((err, results) => {
    if (err) {
      console.log(err);
      return;
    }

    res.send(results);
  });
});

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
