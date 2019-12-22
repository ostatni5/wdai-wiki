import { Component, OnInit } from '@angular/core';
import { CoursesService } from 'src/app/services/courses.service';
import { Course } from 'src/app/shared/course.model';
import { Filter } from 'src/app/shared/filter';

@Component({
  selector: 'app-courses-list',
  templateUrl: './courses-list.component.html',
  styleUrls: ['./courses-list.component.scss']
})
export class CoursesListComponent implements OnInit {
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
