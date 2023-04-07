const fs = require('fs');
const Database = require('better-sqlite3');

const db = new Database(process.env.DB || 'sqlite3.db');

//
// Routes for database operations
//
exports.applySchema = function() {
    // Make sure tables and initial data exist in the database
	let schema = fs.readFileSync('schema.sql').toString();
    db.exec(schema);
};

exports.dropAllTables = function() {
	for(let row of db.prepare("SELECT name FROM sqlite_master WHERE type = 'table'").all()) {
        if (row.name != 'sqlite_sequence') { 
		    db.prepare(`drop table "${row['name']}"`).run();
        }
	}
}

//
// Routes for users
//
exports.getUsers = function() {
    return db.prepare('select * from users').all();
};

exports.getUser = function(id) {
    let result = db.prepare('select * from users where id=(?)').all(id);
	return result;
};

exports.insertUser = function(name, profile_pic_id) {
    let result = db.prepare('insert into users(name, profile_pic_id) values(?, ?)').run(name, profile_pic_id);
	return result.lastInsertRowid;
};

exports.editUser = function(id, name, profile_pic_id) {
    let result = db.prepare('update users set name=(?), profile_pic_id=(?) WHERE id=(?)').run(name, profile_pic_id, id);
	return result;
};



//
// Routes for exercises
//
exports.getUserExercises = function(id) {
    return db.prepare('select * from exercises where userid=(?)').all(id);
}

exports.insertExercise = function(userid,name,date) {
    let result = db.prepare('insert into exercises(userid,name,date) values(?,?,?)').run(userid, name, date);
	return result.lastInsertRowid;
};

exports.deleteExercise = function(id) {
    let result = db.prepare('delete from exercises where id=(?)').run(id);
	return result.changes;
};

exports.editExercise = function(id, name, date) {
    let result = db.prepare('update exercises set name=(?), date=(?) WHERE id=(?)').run(name, date, id);
	return result.changes;
};

