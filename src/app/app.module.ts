import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CoursesListComponent } from './components/courses-list/courses-list.component';
import { CoursesListElementComponent } from './components/courses-list-element/courses-list-element.component';
import {MatListModule} from '@angular/material/list'
import { CoursesService } from './services/courses.service';
import { RateComponent } from './components/rate/rate.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddCourseComponent } from './components/add-course/add-course.component';
import { SearchPipe } from './pipes/search.pipe';
import { FilterComponent } from './components/filter/filter.component';

@NgModule({
  declarations: [
    AppComponent,
    CoursesListComponent,
    CoursesListElementComponent,
    RateComponent,
    AddCourseComponent,
    SearchPipe,
    FilterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatListModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [CoursesService],
  bootstrap: [AppComponent]
})
export class AppModule { }
