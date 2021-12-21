# WdaiWiki

Project for web apps course written in Angular 2+. The main focus of the project was to learn about writing a basic app in Angular and connecting it to a custom server and database. The look of UI wasn't considered, so it is looking in its way `.  
This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 8.3.20.

## Tech stack
Front-end app is written in Angular 2+. The backend app is using node.js. Authorization is based on Firebase Auth. User roles are stored in real-time Firebase database. Data is stored in the MongoDB database.

## Functionality 

### Login/Register panel 

It is possible to log in as an admin user or standard user, also the app provides the possibility to register a new standard user. Basic validation is implemented. 

![obraz](https://user-images.githubusercontent.com/26521377/146971650-29995f3a-2036-4cca-95ca-cc6774f72120.png)

### Dashboard view

A user can see all available courses in the app and filter them. A user can select how many courses should be displayed on one page.

![obraz](https://user-images.githubusercontent.com/26521377/146972274-0078d43f-9de3-4b2f-96d0-6b59c3cce373.png)

### Course view

A user can see more information about a course after clicking the details button. On this view, the user can register for the course.

![obraz](https://user-images.githubusercontent.com/26521377/146973015-23f405ca-a729-4790-b1d4-9be07b64407c.png)

### Rating course
After registration on the course user can rate the course.

![obraz](https://user-images.githubusercontent.com/26521377/146973261-9f001fd4-547e-4446-9f53-77fbeb6dadf2.png)

### Dashboard view - admin 
The admin user can add a new course via the form with basic validation and edit existing courses.

![obraz](https://user-images.githubusercontent.com/26521377/146974180-13ad4d49-30e6-4cb3-8622-0e78aaa7cdff.png)


## Running backend server

Run `npm start`. Back-end server will run on `http://localhost:5500/`. Config files with certificates and passwords are required.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

