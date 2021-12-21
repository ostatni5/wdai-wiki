import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CourseType } from 'src/app/shared/course-type.enum';
import { Course } from 'src/app/shared/course.model';

@Component({
	selector: 'app-add-course',
	templateUrl: './add-course.component.html',
	styleUrls: ['./add-course.component.scss']
})
export class AddCourseComponent implements OnInit {
	@Output() addCourse = new EventEmitter<object>();
	types = Object.keys(CourseType);

	addCourseForm = new FormGroup({
		name: new FormControl(null, [Validators.required]),
		hostFirstName: new FormControl(null, [Validators.required]),
		hostLastName: new FormControl(null, [Validators.required]),
		ETCS: new FormControl(null, [Validators.required, Validators.min(1), Validators.max(12)]),
		type: new FormControl(null, [Validators.required]),
		semester: new FormControl(null, [
			Validators.required,
			Validators.min(1),
			Validators.max(7)
		]),
		capacity: new FormControl(null, [
			Validators.required,
			Validators.min(1),
			Validators.max(250)
		]),
		image: new FormControl(null, [Validators.required])
	});

	constructor() {}

	ngOnInit() {
		console.log(CourseType);
	}

	onSubmit() {
		// TODO: Use EventEmitter with form value
		console.warn(this.addCourseForm.value);

		let course = new Course(this.addCourseForm.value);
		console.log('Corss', course);
		this.addCourse.emit(course);
		this.addCourseForm.reset();
	}
}
