import { Injectable } from '@angular/core';
import { Course } from '../shared/course.model';
import { MockData } from './mock-data';
import { HttpClient } from '@angular/common/http';
@Injectable({
    providedIn: 'root'
})
export class CoursesService {
    private url="http://localhost:5500"
       

    private courses
    constructor(private http: HttpClient) {
        this.http.get(this.url+"/courses").subscribe((data)=>{
            console.log(data);
            this.courses =  data as Array<Course>;
        })

    }

    getCourses(): Array<Course> {
        return this.courses;
    }
    getCourse(guid): Course {
        return this.courses.filter(course => course.guid === guid)[0];
    }
    addCourse(course: Course) {
        this.courses.unshift(course);
    }
    deleteCourse(guid) {
        this.courses = this.courses.filter(course => course.guid != guid);
    }
    updateCourse(guid,newData)
    {
        let course = this.getCourse(guid);
        for (const key in newData) {
            if (newData.hasOwnProperty(key)) {
                const element = newData[key];
                course[key] = element;
            }
        }
    }
    rateCourse(obj) {
        console.log(obj)
        if (this.isRegisteredOn(obj.guid, obj.email)) {
            let c = this.getCourse(obj.guid);
            if (!this.votedOn(obj.guid, obj.email)) {
                c.rating = ((c.rating * c.votes) + obj.value) / ++c.votes;
                c.registeredUsers.filter(user => user.email === obj.email)[0].vote = obj.value;
            }
            else
                console.error("Arleady voted", obj)
        }

    }
    registerOnCourse(guid, email) {
        let index = this.getIndex(guid);
        if (index > -1) {
            if (this.isRegisteredOn(guid, email)) {
                console.error("Arleady registered", guid, email)
                return;
            }
            if (this.courses[index].capacity <= 0) {
                console.error("No free slots", guid, email)
                alert("No free slots")
            }
            else {
                this.courses[index].registeredUsers.push({ email: email, vote: null })
                this.courses[index].capacity--;
                console.log("Registered", guid, email)
            }
        }

    }
    isRegisteredOn(guid, email): boolean {
        if (!email) console.error("Wrong email", email);
        let index = this.getIndex(guid);
        if (index > -1) {
            if (!this.courses[index].registeredUsers) this.courses[index].registeredUsers = []; else console.warn("Registerd", this.courses[index].registeredUsers);
            return this.courses[index].registeredUsers.findIndex(user => user.email === email) >= 0 ? true : false;
        }
        else
            return false;
    }
    votedOn(guid, email): boolean {
        let c = this.getCourse(guid);
        let v = c.registeredUsers.filter(user => user.email === email)[0];
        if (!c.registeredUsers.filter(user => user.email === email)[0]) return false;
        else
            v = v.vote;
        console.log("Vote", v);
        return v !== null;
    }


    private getIndex(guid) {
        let index = this.courses.findIndex(course => course.guid === guid)
        if (index === -1) {
            console.error("No such course", guid)
        }
        return index;
    }
}


