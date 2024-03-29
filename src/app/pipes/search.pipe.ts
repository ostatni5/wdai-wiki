import { Pipe, PipeTransform } from '@angular/core';
import { Course } from '../shared/course.model';
import { Filter } from '../shared/filter';

@Pipe({
	name: 'search'
})
export class SearchPipe implements PipeTransform {
	transform(courses: Course[], filter: Filter): Course[] {
		console.log('Filrt');
		if (!courses) return [];
		if (!filter) return courses;
		let newCourses = courses;
		let tempArr = [];
		if (this.criteraExist(filter.name)) {
			console.log(filter.name);
			filter.name.forEach(name => {
				name = name.toLowerCase();
				tempArr = tempArr.concat(
					newCourses.filter(course => {
						return course.name.toLowerCase().includes(name);
					})
				);
			});
			newCourses = [...new Set(tempArr)];
			tempArr = [];
		}

		if (this.criteraExist(filter.ETCS)) {
			filter.ETCS.forEach(ETCS => {
				tempArr = tempArr.concat(
					newCourses.filter(course => {
						return course.ETCS == ETCS;
					})
				);
			});
			newCourses = [...new Set(tempArr)];
			tempArr = [];
		}

		if (this.criteraExist(filter.semester)) {
			filter.semester.forEach(semester => {
				tempArr = tempArr.concat(
					newCourses.filter(course => {
						return course.semester == semester;
					})
				);
			});
			newCourses = [...new Set(tempArr)];
			tempArr = [];
		}
		if (this.criteraExist(filter.rate)) {
			filter.rate.forEach(rate => {
				tempArr = tempArr.concat(
					newCourses.filter(course => {
						return course.rating == rate || Math.round(course.rating * 2) / 2 == rate;
					})
				);
			});
			newCourses = [...new Set(tempArr)];
			tempArr = [];
		}

		return newCourses;
	}

	criteraExist(c: Array<any>) {
		let tmp = [...c];
		c.length = 0;
		tmp.filter(e => {
			return Boolean(e);
		}).forEach(e => c.push(e));

		return c && c.length > 0;
	}
}
