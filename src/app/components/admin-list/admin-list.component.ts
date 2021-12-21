import { Component, OnInit, OnDestroy } from '@angular/core';
import { Course } from 'src/app/shared/course.model';
import { Filter } from 'src/app/shared/filter';
import { CoursesService } from 'src/app/services/courses.service';
import { Subscription } from 'rxjs';

@Component({
	selector: 'app-admin-list',
	templateUrl: './admin-list.component.html',
	styleUrls: ['./admin-list.component.scss']
})
export class AdminListComponent implements OnInit, OnDestroy {
	p = 1;
	items = 4;
	courses: Array<Course>;
	filter: Filter;
	sub: Subscription[] = [];
	constructor(private coursesService: CoursesService) {}

	ngOnInit() {
		this.getCourses();
	}

	getCourses() {
		this.sub.push(
			this.coursesService.getCourses().subscribe(data => {
				this.courses = data as Array<Course>;
			})
		);
	}
	addCourse(course: Course) {
		this.sub.push(
			this.coursesService.addCourse(course).subscribe(data => {
				this.getCourses();
			})
		);
	}
	deleteCourse(guid) {
		this.sub.push(
			this.coursesService.deleteCourse(guid).subscribe(data => {
				this.getCourses();
			})
		);
	}
	searchCourse(obj: Filter) {
		this.filter = obj;
		console.log(this.filter);
	}
	ngOnDestroy() {
		this.sub.forEach(s => s.unsubscribe());
	}
}
