const { authorize, authFail } = require('./auth');
const {
	getCourses,
	getCourse,
	addCourse,
	deleteCourse,
	updateCourse,
	rateCourse,
	registerOnCourse,
	isRegisteredOn,
	votedOn
} = require('./db');
const path = require('path');
const express = require('express');
const app = express();

app.use(express.static(path.join(__dirname, '../dist/wdai-wiki')));
app.use(express.json()); // to support JSON-encoded bodies

app.use(function (req, res, next) {
	console.log(req.url);
	res.header('Access-Control-Allow-Origin', '*'); // update to match the domain you will make the request from
	res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,PATCH'); // update to match the domain you will make the request from
	res.header('Access-Control-Allow-Headers', '*');
	next();
});

// app.post('/login', function (req, res) {

//     res.status(403)
//     res.send("err")

// });

app.get('/courses', function (req, res) {
	console.log('/courses');
	authorize(
		req,
		res,
		['admin', 'user'],
		() => {
			getCourses((err, data) => {
				res.send(data);
			});
		},
		authFail
	);
});

app.get('/course/:guid', function (req, res) {
	authorize(
		req,
		res,
		['admin', 'user'],
		() => {
			getCourse(req.params.guid, (err, data) => {
				res.send(data);
			});
		},
		authFail
	);
});

app.post('/course', function (req, res) {
	authorize(
		req,
		res,
		['admin'],
		() => {
			console.log('ADD COURSE');
			addCourse(req.body, err => {
				if (!err)
					err = {
						msg: 'ADDED'
					};
				res.send(err);
			});
		},
		authFail
	);
});

app.delete('/course/:guid', function (req, res) {
	authorize(
		req,
		res,
		['admin'],
		() => {
			console.log('DELETE COURSE');
			console.log(req.params.guid);
			deleteCourse(req.params.guid, err => {
				if (!err)
					err = {
						msg: 'DELETED'
					};
				res.send(err);
			});
		},
		authFail
	);
});

app.put('/course/:guid', function (req, res) {
	authorize(
		req,
		res,
		['admin'],
		() => {
			console.log('PUT COURSE');
			console.log(req.params.guid);
			updateCourse(req.params.guid, req.body, err => {
				if (!err)
					err = {
						msg: 'PUTED'
					};
				res.send(err);
			});
		},
		authFail
	);
});

app.patch('/course/:guid/rate', function (req, res) {
	authorize(
		req,
		res,
		['admin', 'user'],
		() => {
			console.log('RATE COURSE');
			console.log(req.params.guid);
			rateCourse(req.params.guid, req.body, err => {
				if (!err)
					err = {
						msg: 'RATED'
					};
				res.send(err);
			});
		},
		authFail
	);
});

app.patch('/course/:guid/register', function (req, res) {
	authorize(
		req,
		res,
		['admin', 'user'],
		() => {
			console.log('REGISTER ON COURSE');
			console.log(req.params.guid);
			registerOnCourse(req.params.guid, req.body.email, err => {
				if (!err)
					err = {
						msg: 'REGISTERED'
					};
				res.send(err);
			});
		},
		authFail
	);
});

app.get('/course/:guid/registered/:email', function (req, res) {
	authorize(
		req,
		res,
		['admin', 'user'],
		() => {
			isRegisteredOn(req.params.guid, req.params.email, (registerd, course) => {
				console.log('REGISTERD ', registerd);
				res.send(registerd);
			});
		},
		authFail
	);
});

app.get('/course/:guid/voted/:email', function (req, res) {
	authorize(
		req,
		res,
		['admin', 'user'],
		() => {
			votedOn(req.params.guid, req.params.email, (voted, course) => {
				console.log('VOTED ', voted);
				res.send(voted);
			});
		},
		authFail
	);
});

const server = app.listen(process.env.PORT || 5500, () => {
	const host = server.address().address;
	const port = server.address().port;
	console.log('Aplikacja nasłuchuje na http://%s:%s', host, port);
});
