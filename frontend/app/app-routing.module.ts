import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Add user defined (class names) components to which we have to add routing.
import { TitleBodyFormComponent } from './title-body-form/title-body-form.component'
import { DashboardComponent } from './dashboard/dashboard.component'

const routes: Routes = 
				[
					// For editing an existing blog with id.
					{ path: 'editor/:id', component: TitleBodyFormComponent },

					// For a new blog which doesn't have an id yet.
					{ path: 'editor',    component: TitleBodyFormComponent },

					{ path: 'home',       component: DashboardComponent },

					//Default
					{ path: '',       	  redirectTo: '/home', pathMatch: 'full'}
				];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
