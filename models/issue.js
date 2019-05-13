let mongoose = require('mongoose');

let Schema = mongoose.Schema;

let issueSchema = new Schema({
  title: {
    type: String
  },
  responsible: {
    type: String
  },
  description: {
    type: String
  },
  severity: {
    type: String
  },
  status: {
    type: String,
    default: 'Open'
  }
});

let Issue = (module.exports = mongoose.model('Issue', issueSchema));
//Get Issues
module.exports.getIssues = function(callback, limit) {
  Issue.find(callback).limit(limit);
};

//Get Issues by ID
module.exports.getIssuesById = function(id, callback) {
  Issue.findById(id, callback);
};

//Add Issues
module.exports.addIssue = function(issue, callback) {
  Issue.create(issue, callback);
};

//Update Issue
module.exports.updateIssue = function(id, issue, options, callback) {
  let query = { _id: id };
  let update = {
    status: issue.status,
    title: issue.title,
    responsible: issue.responsible,
    description: issue.description,
    severity: issue.severity
  };
  Issue.findOneAndUpdate(query, update, options, callback);
};

//Delete Books
module.exports.removeIssue = function(id, callback) {
  let query = { _id: id };
  Issue.remove(query, callback);
};
