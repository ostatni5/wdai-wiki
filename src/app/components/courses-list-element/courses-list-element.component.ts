import { Component, OnInit, Input } from '@angular/core';
import { Course } from 'src/app/shared/course.model';

@Component({
  selector: 'app-courses-list-element',
  templateUrl: './courses-list-element.component.html',
  styleUrls: ['./courses-list-element.component.scss']
})
export class CoursesListElementComponent implements OnInit {
  @Input() course: Course;
  constructor() { }
  ngOnInit() {
  }

}
