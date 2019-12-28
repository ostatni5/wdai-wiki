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
    voted:boolean
    registerd: boolean
    user: string;
    @Input() guid: String;
    course: Course;
    private sub: any;
    constructor(private coursesService: CoursesService, private route: ActivatedRoute, private router: Router, private auth: AuthService) { }
    ngOnInit() {

            this.user = this.auth.currentUser();


        this.sub = this.route.params.subscribe(params => {
            this.guid = params['guid']; // (+) converts string 'id' to a number
            this.course = this.coursesService.getCourse(this.guid);
            console.log(this.guid)
        });
        console.log("USER", this.user)
        this.registerd = this.coursesService.isRegisteredOn(this.course.guid, this.auth.currentUser());
        this.voted = this.coursesService.votedOn(this.course.guid, this.auth.currentUser());
    }

    rate(value) {
        console.log(value)
        this.coursesService.rateCourse({ value: value, guid: this.course.guid,email:this.auth.currentUser() });
        this.voted = this.coursesService.votedOn(this.course.guid, this.auth.currentUser());
        console.log("voted",this.voted)
    }
    ngOnDestroy() {
        this.sub.unsubscribe();
    }
    registerOn() {
        this.coursesService.registerOnCourse(this.course.guid, this.user);
        this.course = this.coursesService.getCourse(this.guid);
        this.registerd = this.coursesService.isRegisteredOn(this.course.guid, this.user);
        console.log(this.coursesService.isRegisteredOn(this.course.guid, this.user))
    }

}
