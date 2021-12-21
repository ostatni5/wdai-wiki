const user = process.env.DATABASE_USER
	? JSON.parse(new Buffer(process.env.DATABASE_USER, 'base64').toString('utf8'))
	: require('./databaseUser');

const uri = `mongodb+srv://${user.name}:${user.pass}@cluster0.ebyku.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.connect(uri, {
	useUnifiedTopology: true,
	useNewUrlParser: true
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'błąd połączenia...'));
db.once('open', function () {
	console.log('połączenie udane');
});

const Person = new Schema({
	firstName: String,
	lastName: String
});

const CourseSchema = new Schema({
	index: Number,
	guid: String,
	name: String,
	host: Person,
	ETCS: Number,
	semester: Number,
	type: String,
	capacity: Number,
	rating: Number,
	votes: Number,
	image: String,
	registeredUsers: []
});

const Course = mongoose.model('Course', CourseSchema, 'courses');

const Courses = mongoose.model('Course');

function getCourses(call) {
	Courses.find({})
		.sort('name')
		.exec(function (err, data) {
			//console.log(err, data, data.length);
			call(err, data);
		});
}

function getCourse(guid, call) {
	Courses.findOne(
		{
			guid: guid
		},
		function (err, data) {
			//console.log(err, data, data.length);
			call(err, data);
		}
	);
}

function addCourse(course, call) {
	let newCourse = new Course();
	for (const key in course) {
		if (course.hasOwnProperty(key)) {
			newCourse[key] = course[key];
		}
	}
	newCourse.save(function (err) {
		if (err) throw err;
		console.log('New course saved.');
		call(err);
	});
}

function deleteCourse(guid, call) {
	Courses.deleteOne(
		{
			guid: guid
		},
		function (err) {
			if (err) throw err;
			call(err);
		}
	);
}

function updateCourse(guid, newData, call) {
	newData.host = {
		firstName: newData.hostFirstName,
		lastName: newData.hostLastName
	};
	Courses.updateOne(
		{
			guid: guid
		},
		newData,
		function (err) {
			if (err) throw err;
			call(err);
		}
	);
}

function rateCourse(guid, obj, call) {
	isRegisteredOn(guid, obj.email, (registered, course) => {
		if (registered) {
			votedOn(guid, obj.email, (voted, course) => {
				if (!voted) {
					course.rating = (course.rating * course.votes + obj.value) / ++course.votes;
					course.registeredUsers.find(user => user.email === obj.email).vote = obj.value;
					updateCourse(guid, course, call);
				}
			});
		}
	});
}

function registerOnCourse(guid, email, call) {
	isRegisteredOn(guid, email, (registered, course) => {
		if (!registered) {
			if (course.capacity <= 0) {
				console.error('No free slots', guid, email);
			} else {
				course.registeredUsers.push({
					email: email,
					vote: null
				});
				course.capacity--;
				console.error('Register', guid, email);
				updateCourse(guid, course, call);
			}
		} else console.error('Arleady registered', guid, email);
	});
}

function isRegisteredOn(guid, email, call) {
	getCourse(guid, (err, data) => {
		if (!err) {
			call(
				data.registeredUsers.findIndex(user => user.email === email) >= 0 ? true : false,
				data
			);
		} else console.error(err);
	});
}

function votedOn(guid, email, call) {
	getCourse(guid, (err, data) => {
		if (!err) {
			let row = data.registeredUsers.find(user => user.email === email);
			if (row) call(row.vote != null, data);
			else call(false, data);
		} else console.error(err);
	});
}

module.exports = {
	getCourses,
	getCourse,
	addCourse,
	deleteCourse,
	updateCourse,
	rateCourse,
	registerOnCourse,
	isRegisteredOn,
	votedOn
};
