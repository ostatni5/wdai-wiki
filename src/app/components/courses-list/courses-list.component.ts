import { Component, OnInit, OnDestroy } from '@angular/core';
import { CoursesService } from 'src/app/services/courses.service';
import { Course } from 'src/app/shared/course.model';
import { Filter } from 'src/app/shared/filter';
import { Observable, Subscription } from 'rxjs';

@Component({
	selector: 'app-courses-list',
	templateUrl: './courses-list.component.html',
	styleUrls: ['./courses-list.component.scss']
})
export class CoursesListComponent implements OnInit, OnDestroy {
	p = 1;
	items = 4;
	courses: Array<Course>;
	filter: Filter;
	sub: Subscription;
	constructor(private coursesService: CoursesService) {}

	ngOnInit() {
		this.getCourses();
	}

	getCourses() {
		this.sub = this.coursesService.getCourses().subscribe(data => {
			this.courses = data as Array<Course>;
		});
	}
	searchCourse(obj: Filter) {
		this.filter = obj;
		console.log(this.filter);
	}
	ngOnDestroy() {
		this.sub.unsubscribe();
	}
}
