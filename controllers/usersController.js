// USERS controller: Ø₪₪₪₪§╣ΞΞΞΞΞΞΞΞΞΞΞΞΞΞΞΞΞΞΞ>

function addUserToDB(userObj, callback){
	connection.query('INSERT INTO tblUsers SET ?', userObj, function(err, results){
		if (err) return callback(false, err)
		callback(true. null)
	});
}

module.exports.addUserToDB = addUserToDB;

function findUser(username, callback){
	connection.query('SELECT * FROM tblUsers WHERE ?', {username: username}, function(err, user){
		callback(err, user)
	})
}
module.exports.findUser = findUser;