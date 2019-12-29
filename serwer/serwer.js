var express = require('express');
var app = express();
var user = require('./password');
const uri = `mongodb+srv://${user.name}:${user.pass}@cluster2019-yzt3b.mongodb.net/wdai-wiki-database?useUnifiedTopology=true`;
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
mongoose.connect(uri, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
});
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'błąd połączenia...'));
db.once('open', function () {
    console.log("połączenie udane")
});

var Person = new Schema({
    firstName: String,
    lastName: String,
});

var Course = new Schema({
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

mongoose.model('courses', Course, 'courses');

var Courses = mongoose.model('courses');

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});


app.get('/courses', function (req, res) {
    getCourses((err, data) => {
        res.send(data);
    });

});
app.post('/', function (req, res) {
    console.log("Otrzymano żądanie POST dla strony głównej");
    res.send('Hello POST');
});
app.delete('/usun', function (req, res) {
    console.log("Otrzymano żądanie DELETE dla strony /usun");
    res.send('Hello DELETE');
});
app.put('/user_list', function (req, res) {
    console.log("Otrzymano żądanie PUT dla strony /user_list");
    res.send('Lista użytkowników');
});
app.get('/ab*cd', function (req, res) {
    console.log("Otrzymano żądanie GET dla strony /ab*cd");
    res.send('Wzorzec strony dopasowany');
});
var server = app.listen(5500, function () {
    var host = server.address().address
    var port = server.address().port;
    console.log("Przykładowa aplikacja nasłuchuje na http://%s:%s", host, port)
})






function getCourses(call) {
    Courses.find({}, function (err, data) {
        console.log(err, data, data.length);
        call(err, data);
    });
}

function getCourse(guid, call) {
    Courses.find({
        guid: guid
    }, function (err, data) {
        console.log(err, data, data.length);
        call(err, data);
    });
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
        call(err)
    })
}

function deleteCourse(guid) {
    Courses.deleteOne({
        guid: guid
    }, function (err) {
        if (err) throw err;
        call(err);
    });
}

function updateCourse(guid, newData) {
    Courses.update({
        guid: guid
    }, newData, function (err) {
        if (err) throw err;
        call(err);
    });
}

function rateCourse(obj) {
    console.log(obj)
    if (this.isRegisteredOn(obj.guid, obj.email)) {
        let c = this.getCourse(obj.guid);
        if (!this.votedOn(obj.guid, obj.email)) {
            c.rating = ((c.rating * c.votes) + obj.value) / ++c.votes;
            c.registeredUsers.filter(user => user.email === obj.email)[0].vote = obj.value;
        } else
            console.error("Arleady voted", obj)
    }

}

function registerOnCourse(guid, email) {
    let index = this.getIndex(guid);
    if (index > -1) {
        if (this.isRegisteredOn(guid, email)) {
            console.error("Arleady registered", guid, email)
            return;
        }
        if (this.courses[index].capacity <= 0) {
            console.error("No free slots", guid, email)
            alert("No free slots")
        } else {
            this.courses[index].registeredUsers.push({
                email: email,
                vote: null
            })
            this.courses[index].capacity--;
            console.log("Registered", guid, email)
        }
    }

}

function isRegisteredOn(guid, email) {
    if (!email) console.error("Wrong email", email);
    let index = this.getIndex(guid);
    if (index > -1) {
        if (!this.courses[index].registeredUsers) this.courses[index].registeredUsers = [];
        else console.warn("Registerd", this.courses[index].registeredUsers);
        return this.courses[index].registeredUsers.findIndex(user => user.email === email) >= 0 ? true : false;
    } else
        return false;
}

function votedOn(guid, email) {
    let c = this.getCourse(guid);
    let v = c.registeredUsers.filter(user => user.email === email)[0];
    if (!c.registeredUsers.filter(user => user.email === email)[0]) return false;
    else
        v = v.vote;
    console.log("Vote", v);
    return v !== null;
}


function getIndex(guid) {
    let index = this.courses.findIndex(course => course.guid === guid)
    if (index === -1) {
        console.error("No such course", guid)
    }
    return index;
}
