import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Course } from 'src/app/shared/course.model';
import { CoursesService } from 'src/app/services/courses.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
	selector: 'app-detalied-view',
	templateUrl: './detalied-view.component.html',
	styleUrls: ['./detalied-view.component.scss']
})
export class DetaliedViewComponent implements OnInit, OnDestroy {
	loaded = false;
	voted: boolean;
	registerd: boolean;
	user: string;
	@Input() guid: String;
	course = new Course();
	private sub: any;
	private subC: any;
	private subR: any;
	constructor(
		private coursesService: CoursesService,
		private route: ActivatedRoute,
		private router: Router,
		private auth: AuthService
	) {}
	ngOnInit() {
		this.user = this.auth.currentUser();
		this.sub = this.route.params.subscribe(params => {
			this.guid = params['guid']; // (+) converts string 'id' to a number
			this.subC = this.coursesService.getCourse(this.guid).subscribe(data => {
				console.log('USER', this.user, data);
				this.course = data as Course;

				this.subR = this.coursesService
					.isRegisteredOn(this.course.guid, this.auth.currentUser())
					.subscribe((data: boolean) => {
						this.registerd = data;
						this.subR.unsubscribe();
						this.subR = this.coursesService
							.votedOn(this.course.guid, this.auth.currentUser())
							.subscribe((data: boolean) => {
								this.voted = data;
								this.loaded = true;
								this.subR.unsubscribe();
							});
					});
			});
			console.log(this.guid);
		});
	}

	rate(value) {
		this.subC.unsubscribe();
		this.subC = this.coursesService
			.rateCourse({ value: value, guid: this.course.guid, email: this.auth.currentUser() })
			.subscribe(data => {
				this.subC.unsubscribe();
				this.subC = this.coursesService.getCourse(this.guid).subscribe(data => {
					this.course = data as Course;
					this.subC.unsubscribe();
				});
			});
		this.voted = true;
	}

	registerOn() {
		this.subC.unsubscribe();
		this.subC = this.coursesService.registerOnCourse(this.course.guid, this.user).subscribe();
		this.registerd = true;
	}
	ngOnDestroy() {
		this.sub.unsubscribe();
		this.subC.unsubscribe();
	}
}
