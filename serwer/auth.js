const firebaseAdmin = require('firebase-admin');
const serviceAccount = process.env.ACCOUNT
	? JSON.parse(new Buffer(process.env.ACCOUNT, 'base64').toString('utf8'))
	: require('./wdai-wiki-firebase-adminsdk-3918c-d3c5863dd4.json');

const firebaseConfig = {
	credential: firebaseAdmin.credential.cert(serviceAccount),
	apiKey: 'AIzaSyBlHEUVoo5FWyhfVlbbDpIjrXqxqESSOHM',
	authDomain: 'wdai-wiki.firebaseapp.com',
	databaseURL: 'https://wdai-wiki.firebaseio.com',
	projectId: 'wdai-wiki',
	storageBucket: 'wdai-wiki.appspot.com',
	messagingSenderId: '599826869007',
	appId: '1:599826869007:web:ef0a705025f592113d2c7a',
	measurementId: 'G-628ZYCMVGX'
};
firebaseAdmin.initializeApp(firebaseConfig);

const fDb = firebaseAdmin.database();

fDb.ref('users').on(
	'value',
	function (snapshot) {
		console.log(snapshot.val());
	},
	function (errorObject) {
		console.log('The read failed: ' + errorObject.code);
	}
);

function getRole(guid, call) {
	fDb.ref('users').on(
		'value',
		function (snapshot) {
			call(snapshot.val()[guid] ? snapshot.val()[guid].role : null);
		},
		function (errorObject) {
			console.log('The read failed: ' + errorObject.code);
		}
	);
}

function authorize(req, res, roles, success, failed) {
	console.log('Auth');
	if (roles.length == 0) return success();
	if (req.headers['authorization'])
		firebaseAdmin
			.auth()
			.verifyIdToken(req.headers['authorization'])
			.then(function (decodedToken) {
				if (roles.findIndex(e => e == 'user') > -1) {
					success();
				} else
					getRole(decodedToken.user_id, role => {
						console.log("role",role)
						if (role) {
							roles.findIndex(e => e == role) > -1 ? success() : failed(res);
						} else failed(res);
					});
			})
			.catch(function (error) {
				console.log(error);
				failed(res);
			});
	else failed(res);
}

function authFail(res) {
	let err = new Error('Auth Failed');
	res.status(403);
	res.send(err);
}

module.exports = {
	authorize,
	authFail
};
