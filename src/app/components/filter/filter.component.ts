import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormControl, FormsModule, Validators } from '@angular/forms';
import { Filter } from 'src/app/shared/filter';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {
  @Output() searchCourse = new EventEmitter<object>();

  searchForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    ETCS: new FormControl(null),
    semester: new FormControl(null),
    rate: new FormControl(null),
  });
  searchForm2 = new FormGroup({
    name: new FormControl('', [Validators.required]),
    ETCS: new FormControl(null),
    semester: new FormControl(null),
    rate: new FormControl(null),
  });

  constructor() { }

  ngOnInit() {
  }

  onSubmit() {

    let filter = {
      name: [this.searchForm.value.name,this.searchForm2.value.name],
      ETCS: [this.searchForm.value.ETCS,this.searchForm2.value.ETCS],
      semester: [this.searchForm.value.semester,this.searchForm2.value.semester],
      rate: [this.searchForm.value.rate,this.searchForm2.value.rate]
    };
    this.searchCourse.emit(filter);

  }
}
