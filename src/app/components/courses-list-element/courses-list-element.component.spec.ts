import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoursesListElementComponent } from './courses-list-element.component';

describe('CoursesListElementComponent', () => {
	let component: CoursesListElementComponent;
	let fixture: ComponentFixture<CoursesListElementComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [CoursesListElementComponent]
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(CoursesListElementComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
