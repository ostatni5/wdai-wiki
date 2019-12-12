import { Component, OnInit } from '@angular/core';
import { CoursesService } from 'src/app/services/courses.service';
import { Course } from 'src/app/shared/course.model';

@Component({
  selector: 'app-courses-list',
  templateUrl: './courses-list.component.html',
  styleUrls: ['./courses-list.component.scss']
})
export class CoursesListComponent implements OnInit {
  courses:Array<Course>
  constructor(private coursesService: CoursesService) {
    this.courses= coursesService.getCourses();
    console.log(this.courses);
    console.log(this.courses[0].host);
    console.log(this.courses[0].type);
   }

  ngOnInit() {
  }

}
