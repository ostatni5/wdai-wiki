import { Injectable } from '@angular/core';
import { Course } from '../shared/course.model';
import { MockData } from './mock-data';
@Injectable({
  providedIn: 'root'
})
export class CoursesService {
  constructor() { 
    
  }

  getCourses(): Array<Course>{
    return new MockData().Courses as Array<Course>;
  }
  getCourse(): Course{
    return ;
  }
  addCourse(){
    
  }
  deleteCourse(){
    
  }


}
