import { Component, OnInit } from '@angular/core';
import { Course } from 'src/app/shared/course.model';
import { Filter } from 'src/app/shared/filter';
import { CoursesService } from 'src/app/services/courses.service';

@Component({
  selector: 'app-admin-list',
  templateUrl: './admin-list.component.html',
  styleUrls: ['./admin-list.component.scss']
})
export class AdminListComponent implements OnInit {

  courses:Array<Course>
  filter:Filter
  constructor(private coursesService: CoursesService) {    
   }

  ngOnInit() {  
    this.getCourses();    
  } 

  getCourses(){
    this.courses= this.coursesService.getCourses(); 
  }
  addCourse(course:Course)
  {
    this.coursesService.addCourse(course);
    this.getCourses();
  }
  deleteCourse(guid)
  {
    this.coursesService.deleteCourse(guid);
    this.getCourses();
  }
  rateCourse(obj)
  {
    this.coursesService.rateCourse(obj);
    this.getCourses();
  }
  searchCourse(obj:Filter)
  {
    this.filter=obj;
    console.log(this.filter);
  }
}
