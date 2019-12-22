import { Injectable } from '@angular/core';
import { Course } from '../shared/course.model';
import { MockData } from './mock-data';
@Injectable({
  providedIn: 'root'
})
export class CoursesService {
  private courses
  constructor() {
    this.courses = new MockData().Courses as Array<Course>
  }

  getCourses(): Array<Course> {
    return this.courses;
  }
  getCourse(guid): Course {
    return  this.courses.filter(course => course.guid == guid)[0];
  }
  addCourse(course:Course) {
    this.courses.unshift(course);
  }
  deleteCourse(guid) {  
    this.courses=this.courses.filter(course=>course.guid != guid);
   
  }
  rateCourse(obj){
    console.log(obj)
    let c =this.getCourse(obj.guid);
    c.rating= ((c.rating*c.votes)+obj.value)/++c.votes;
  }

}
