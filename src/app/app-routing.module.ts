import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CoursesListComponent } from './components/courses-list/courses-list.component';
import { DetaliedViewComponent } from './components/detalied-view/detalied-view.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { AdminListComponent } from './components/admin-list/admin-list.component';
import { EditCourseComponent } from './components/edit-course/edit-course.component';
import { AuthGuard } from './guard/auth.guard';
import { AuthAdminGuard } from './guard/auth-admin.guard';


const routes: Routes = [
  { path: 'admin', component: AdminListComponent,canActivate:[AuthAdminGuard] },
  { path: 'dashboard', component: CoursesListComponent ,canActivate:[AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'course/:guid', component: DetaliedViewComponent,canActivate:[AuthGuard] }, 
  { path: 'edit/:guid', component: EditCourseComponent,canActivate:[AuthAdminGuard]}, 
  { path: '', redirectTo:"dashboard",pathMatch:"full" },
  { path: '**', redirectTo:"dashboard",pathMatch:"full" }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
