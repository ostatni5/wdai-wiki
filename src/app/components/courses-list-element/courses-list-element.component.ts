import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Course } from 'src/app/shared/course.model';

@Component({
	selector: 'app-courses-list-element',
	templateUrl: './courses-list-element.component.html',
	styleUrls: ['./courses-list-element.component.scss']
})
export class CoursesListElementComponent implements OnInit {
	@Input() admin: Boolean;
	@Input() course: Course;
	@Output() deleteCourse = new EventEmitter<string>();
	@Output() rateCourse = new EventEmitter<object>();
	constructor() {}
	ngOnInit() {}
	delete() {
		this.deleteCourse.emit(this.course.guid);
	}
	rate(value) {
		console.log(value);
		this.rateCourse.emit({ value: value, guid: this.course.guid });
	}
}
