var express = require("express");
var firebaseAdmin = require("firebase-admin");
var serviceAccount = process.env.ACCOUNT
    ? JSON.parse(process.env.ACCOUNT)
    : require("./wdai-wiki-firebase-adminsdk-3918c-d3c5863dd4.json");

let firebaseConfig = {
    credential: firebaseAdmin.credential.cert(serviceAccount),
    apiKey: "AIzaSyBlHEUVoo5FWyhfVlbbDpIjrXqxqESSOHM",
    authDomain: "wdai-wiki.firebaseapp.com",
    databaseURL: "https://wdai-wiki.firebaseio.com",
    projectId: "wdai-wiki",
    storageBucket: "wdai-wiki.appspot.com",
    messagingSenderId: "599826869007",
    appId: "1:599826869007:web:ef0a705025f592113d2c7a",
    measurementId: "G-628ZYCMVGX",
};
firebaseAdmin.initializeApp(firebaseConfig);

var fDb = firebaseAdmin.database();

fDb.ref("users").on(
    "value",
    function (snapshot) {
        console.log(snapshot.val());
    },
    function (errorObject) {
        console.log("The read failed: " + errorObject.code);
    }
);

function getRole(guid, call) {
    fDb.ref("users").on(
        "value",
        function (snapshot) {
            call(snapshot.val()[guid] ? snapshot.val()[guid].role : null);
        },
        function (errorObject) {
            console.log("The read failed: " + errorObject.code);
        }
    );
}

function authorize(req, res, roles, succ, failed) {
    console.log("Auth");
    if (roles.length == 0) return succ();
    if (req.headers["authorization"])
        firebaseAdmin
            .auth()
            .verifyIdToken(req.headers["authorization"])
            .then(function (decodedToken) {
                if (roles.findIndex((e) => e == "user") > -1) {
                    succ();
                } else
                    getRole(decodedToken.user_id, (role) => {
                        if (role) {
                            roles.findIndex((e) => e == role) > -1
                                ? succ()
                                : failed(res);
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
    let err = new Error("Auth Failed");
    res.status(403);
    res.send(err);
}

var app = express();
var user = require("./password");
app.use(express.json()); // to support JSON-encoded bodies
const uri = `mongodb+srv://${user.name}:${user.pass}@cluster2019-yzt3b.mongodb.net/wdai-wiki-database?retryWrites=true&w=majority`;
var mongoose = require("mongoose");
var Schema = mongoose.Schema;
mongoose.connect(uri, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
});
var db = mongoose.connection;
db.on("error", console.error.bind(console, "błąd połączenia..."));
db.once("open", function () {
    console.log("połączenie udane");
});

var Person = new Schema({
    firstName: String,
    lastName: String,
});

var CourseSchema = new Schema({
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
    registeredUsers: [],
});

var Course = mongoose.model("Course", CourseSchema, "courses");

var Courses = mongoose.model("Course");

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Methods", "*"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "*");
    next();
});

// app.post('/login', function (req, res) {

//     res.status(403)
//     res.send("err")

// });

app.get("/courses", function (req, res) {
    console.log("/courses");
    authorize(
        req,
        res,
        ["admin", "user"],
        () => {
            getCourses((err, data) => {
                res.send(data);
            });
        },
        authFail
    );
});
app.get("/course/:guid", function (req, res) {
    authorize(
        req,
        res,
        ["admin", "user"],
        () => {
            getCourse(req.params.guid, (err, data) => {
                res.send(data);
            });
        },
        authFail
    );
});
app.post("/course", function (req, res) {
    authorize(
        req,
        res,
        ["admin"],
        () => {
            console.log("ADD COURSE");
            addCourse(req.body, (err) => {
                if (!err)
                    err = {
                        msg: "ADDED",
                    };
                res.send(err);
            });
        },
        authFail
    );
});
app.delete("/course/:guid", function (req, res) {
    authorize(
        req,
        res,
        ["admin"],
        () => {
            console.log("DELETE COURSE");
            console.log(req.params.guid);
            deleteCourse(req.params.guid, (err) => {
                if (!err)
                    err = {
                        msg: "DELETED",
                    };
                res.send(err);
            });
        },
        authFail
    );
});

app.put("/course/:guid", function (req, res) {
    authorize(
        req,
        res,
        ["admin"],
        () => {
            console.log("PUT COURSE");
            console.log(req.params.guid);
            updateCourse(req.params.guid, req.body, (err) => {
                if (!err)
                    err = {
                        msg: "PUTED",
                    };
                res.send(err);
            });
        },
        authFail
    );
});
app.patch("/course/:guid/rate", function (req, res) {
    authorize(
        req,
        res,
        ["admin", "user"],
        () => {
            console.log("RATE COURSE");
            console.log(req.params.guid);
            rateCourse(req.params.guid, req.body, (err) => {
                if (!err)
                    err = {
                        msg: "RATED",
                    };
                res.send(err);
            });
        },
        authFail
    );
});
app.patch("/course/:guid/register", function (req, res) {
    authorize(
        req,
        res,
        ["admin", "user"],
        () => {
            console.log("REGISTER ON COURSE");
            console.log(req.params.guid);
            registerOnCourse(req.params.guid, req.body.email, (err) => {
                if (!err)
                    err = {
                        msg: "REGISTERED",
                    };
                res.send(err);
            });
        },
        authFail
    );
});
app.get("/course/:guid/registered/:email", function (req, res) {
    authorize(
        req,
        res,
        ["admin", "user"],
        () => {
            isRegisteredOn(
                req.params.guid,
                req.params.email,
                (registerd, course) => {
                    console.log("REGISTERD ", registerd);
                    res.send(registerd);
                }
            );
        },
        authFail
    );
});
app.get("/course/:guid/voted/:email", function (req, res) {
    authorize(
        req,
        res,
        ["admin", "user"],
        () => {
            votedOn(req.params.guid, req.params.email, (voted, course) => {
                console.log("VOTED ", voted);
                res.send(voted);
            });
        },
        authFail
    );
});

var server = app.listen(process.env.PORT || 5500, function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log("Przykładowa aplikacja nasłuchuje na http://%s:%s", host, port);
});

function getCourses(call) {
    Courses.find({})
        .sort("name")
        .exec(function (err, data) {
            //console.log(err, data, data.length);
            call(err, data);
        });
}

function getCourse(guid, call) {
    Courses.findOne(
        {
            guid: guid,
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
        console.log("New course saved.");
        call(err);
    });
}

function deleteCourse(guid, call) {
    Courses.deleteOne(
        {
            guid: guid,
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
        lastName: newData.hostLastName,
    };
    Courses.updateOne(
        {
            guid: guid,
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
                    course.rating =
                        (course.rating * course.votes + obj.value) /
                        ++course.votes;
                    course.registeredUsers.find(
                        (user) => user.email === obj.email
                    ).vote = obj.value;
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
                console.error("No free slots", guid, email);
            } else {
                course.registeredUsers.push({
                    email: email,
                    vote: null,
                });
                course.capacity--;
                console.error("Register", guid, email);
                updateCourse(guid, course, call);
            }
        } else console.error("Arleady registered", guid, email);
    });
}

function isRegisteredOn(guid, email, call) {
    getCourse(guid, (err, data) => {
        if (!err) {
            call(
                data.registeredUsers.findIndex(
                    (user) => user.email === email
                ) >= 0
                    ? true
                    : false,
                data
            );
        } else console.error(err);
    });
}

function votedOn(guid, email, call) {
    getCourse(guid, (err, data) => {
        if (!err) {
            let row = data.registeredUsers.find((user) => user.email === email);
            if (row) call(row.vote != null, data);
            else call(false, data);
        } else console.error(err);
    });
}
