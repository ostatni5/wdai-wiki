import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';

@Component({
  selector: 'app-rate',
  templateUrl: './rate.component.html',
  styleUrls: ['./rate.component.scss']
})
export class RateComponent implements OnInit {
  @Output() rated = new EventEmitter<number>();
  @Input() initValue: number;
  @Input() showRate: boolean;
  value= 5;
  constructor() { }

  ngOnInit() {
    this.value= Math.round(this.initValue*2)/2;
  }
  rate(){
    console.log(this.value)
    this.rated.emit(this.value);
  }

}
