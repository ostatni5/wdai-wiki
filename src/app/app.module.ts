import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CoursesListComponent } from './components/courses-list/courses-list.component';
import { CoursesListElementComponent } from './components/courses-list-element/courses-list-element.component';
import {MatListModule} from '@angular/material/list'
import { CoursesService } from './services/courses.service';

@NgModule({
  declarations: [
    AppComponent,
    CoursesListComponent,
    CoursesListElementComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatListModule
  ],
  providers: [CoursesService],
  bootstrap: [AppComponent]
})
export class AppModule { }
