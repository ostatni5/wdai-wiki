import { Injectable } from '@angular/core';
import { Course } from '../shared/course.model';
import { MockData } from './mock-data';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';
@Injectable({
    providedIn: 'root'
})
export class CoursesService {
    private url="http://localhost:5500";
    private httpOptions = {
        headers: new HttpHeaders({
          'Content-Type':  'application/json',
          'Authorization': 'my-auth-token'
        })
      };
       

    private courses;
    constructor(private http: HttpClient, private auth: AuthService) {
        

    }

    getCourses() {
        return this.http.get(this.url+"/courses",this.setHeaders());
    }
    getCourse(guid) {
        return this.http.get(this.url+"/course/"+guid,this.setHeaders());
    }
    addCourse(course: Course) {
        return this.http.post<Course>(this.url+"/course", course,this.setHeaders());
    }
    deleteCourse(guid) {
        return this.http.delete(this.url+"/course/"+guid,this.setHeaders());        
    }
    updateCourse(guid,newData){
        return this.http.put<Course>(this.url+"/course/"+guid,newData,this.setHeaders()); 
    }
    rateCourse(obj) {
        return this.http.patch(`${this.url}/course/${obj.guid}/rate`,{email:obj.email,value:obj.value},this.setHeaders());
    }
    registerOnCourse(guid, email) {
        return this.http.patch(`${this.url}/course/${guid}/register`,{email},this.setHeaders());

    }
    isRegisteredOn(guid, email) {
        return this.http.get(`${this.url}/course/${guid}/registered/${email}`,this.setHeaders());
    }
    votedOn(guid, email) {
        return this.http.get(`${this.url}/course/${guid}/voted/${email}`, this.setHeaders());
    }

    setHeaders(): object {
        console.log(this.auth.currentToken()) 
        this.httpOptions.headers= new HttpHeaders({
            'Content-Type':  'application/json',
            'Authorization': this.auth.currentToken()
          })
          console.log(this.httpOptions.headers)       
        return this.httpOptions;
    }
    

}


