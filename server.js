let express = require('express');
let cors = require('cors');
let bodyParser = require('body-parser');
let mongoose = require('mongoose');
let path = require('path');
let app = express();
let router = express.Router();
let MongoClient = require('mongodb').MongoClient;

app.use(cors());
app.use(bodyParser.json());

Issue = require('./models/issue');

// replace the uri string with your connection string.
// const uri =
//   'mongodb+srv://desoga:kevinkeegan@cluster0-ltqea.mongodb.net/test?retryWrites=true';
// MongoClient.connect(uri, function(err, client) {
//   if (err) {
//     console.log('Error occurred while connecting to MongoDB Atlas...\n', err);
//   }
//   console.log('Connected mongo client...');
//   const collection = client.db('test').collection('devices');
//   // perform actions on the collection object
//   client.close();
// });

mongoose.connect('mongodb://localhost/meanstack');
let db = mongoose.connection;

db.once('open', () => {
  console.log('MONGODB database connection has been established');
});

//Get A Single Issue
app.get('/issues', function(req, res) {
  Issue.getIssues((err, issues) => {
    if (err) console.log(err);
    else res.json(issues);
  });
});

//Get A Single Issue By ID
app.get('/issues/:_id', function(req, res) {
  Issue.getIssuesById(req.params._id, (err, issue) => {
    if (err) {
      console.log(err);
    } else {
      res.json(issue);
    }
  });
});

//Add A Issue
app.post('/issues/add', function(req, res) {
  let issue = new Issue(req.body);
  issue
    .save()
    .then(issue => {
      res.status(200).json({ issue: 'Added Successfully' });
    })
    .catch(err => {
      res.status(400).send('Failed To Create New Record');
    });
});

//Update Existing Issue
app.put('/issues/update/:_id', function(req, res) {
  let id = req.params._id;
  let issue = req.body;
  Issue.updateIssue(id, issue, {}, function(err, issue) {
    if (err) {
      throw err;
    }
    res.json('Issue Updated');
  });
});

//Delete Issues By ID
app.delete('/issues/delete/:_id', function(req, res) {
  let id = req.params._id;
  Issue.removeIssue(id, function(err, issue) {
    if (err) {
      throw err;
    }
    res.json('Issue Has Been Removed Successfully');
  });
});

app.use('/', router);

// //Static Folder
// app.use(express.static(path.join(__dirname, 'models')));

app.listen(4000, () =>
  console.log('The Express Server is Working Consistently on port 4000')
);
