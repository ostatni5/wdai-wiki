import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CourseType } from 'src/app/shared/course-type.enum';
import { Course } from 'src/app/shared/course.model';
import { CoursesService } from 'src/app/services/courses.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
	selector: 'app-edit-course',
	templateUrl: './edit-course.component.html',
	styleUrls: ['./edit-course.component.scss']
})
export class EditCourseComponent implements OnInit, OnDestroy {
	@Input() guid: String;
	types = Object.keys(CourseType);
	loaded = false;
	course: Course;
	private sub: any;
	private subC: any;
	editCourseForm: FormGroup;

	constructor(
		private coursesService: CoursesService,
		private route: ActivatedRoute,
		private router: Router,
		private auth: AuthService
	) {}

	ngOnInit() {
		this.sub = this.route.params.subscribe(params => {
			this.guid = params['guid']; // (+) converts string 'id' to a number
			this.subC = this.coursesService.getCourse(this.guid).subscribe(data => {
				this.course = data as Course;
				console.log(this.course);
				this.editCourseForm = new FormGroup({
					name: new FormControl(this.course.name, [Validators.required]),
					hostFirstName: new FormControl(this.course.host.firstName, [
						Validators.required
					]),
					hostLastName: new FormControl(this.course.host.lastName, [Validators.required]),
					ETCS: new FormControl(this.course.ETCS, [
						Validators.required,
						Validators.min(1),
						Validators.max(12)
					]),
					type: new FormControl(this.course.type, [Validators.required]),
					semester: new FormControl(this.course.semester, [
						Validators.required,
						Validators.min(1),
						Validators.max(7)
					]),
					capacity: new FormControl(this.course.capacity, [
						Validators.required,
						Validators.min(1),
						Validators.max(250)
					]),
					image: new FormControl(this.course.image, [Validators.required])
				});
				this.loaded = true;
				this.subC.unsubscribe();
			});
		});
	}
	ngOnDestroy() {
		this.sub.unsubscribe();
		this.subC.unsubscribe();
	}

	onSubmit() {
		// TODO: Use EventEmitter with form value
		console.warn(this.editCourseForm.value);
		this.sub.unsubscribe();
		this.sub = this.coursesService
			.updateCourse(this.guid, this.editCourseForm.value)
			.subscribe(data => {
				this.router.navigate(['/admin']);
			});
	}
	delete() {
		this.subC.unsubscribe();
		this.subC = this.coursesService.deleteCourse(this.course.guid).subscribe(data => {
			this.router.navigate(['/admin']);
		});
	}
}
