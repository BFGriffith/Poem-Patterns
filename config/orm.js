// ORM: Ø₪₪₪₪§╣ΞΞΞΞΞΞΞΞΞΞΞΞΞΞΞΞΞΞΞ>
var connection = require('./connection.js');

function addUserToDB(userObj, callback) {
  // connection.query(User.findOne({name: userSubmit.name}), userObj, function(err, results){
  // 	if (err) return callback(false, err)
  // 	callback(true. null)
  // });
  connection.query(db.poets.insert({ "first": userSubmit.first, "last": userSubmit.last }), userObj, function(err, results) {
    if (err) return callback(false, err)
    callback(true.null)
  });

} // END addUserToDB()

module.exports.addUserToDB = addUserToDB;

function findUser(username, callback) {

  var ObjectId = require('mongodb').ObjectID;

  var get_by_id = function(id, callback) {
    console.log("find by: " + id);
    get_collection(function(poets) {
      poets.findOne({ "_id": new ObjectId(id) }, function(err, doc) {
        callback(doc);
      });
    });
  }

  // connection.query('', {username: username}, function(err, user){
  // 	callback(err, user)
  // })

}; // END findUser()

module.exports.findUser = findUser;

/*
var orm {

};

module.exports = orm;
*/
