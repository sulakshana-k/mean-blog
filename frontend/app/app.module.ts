import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TitleBodyFormComponent } from './title-body-form/title-body-form.component';

import { FormsModule } from '@angular/forms';
import { DashboardComponent } from './dashboard/dashboard.component'

// ------------- Added by me for reactive forms:
import { ReactiveFormsModule } from '@angular/forms';

// ------------- Added by me for myElse:
import { MyElseDirective } from './myElse.directive';
import { ElseDirective } from './else.directive';

import { WhitespaceValidatorDirective } from './whitespace-validator.directive';

@NgModule({
  declarations: 
  [
    AppComponent,
    TitleBodyFormComponent,
    DashboardComponent,
    MyElseDirective,
    ElseDirective,
    WhitespaceValidatorDirective    
  ],
  imports: 
  [
    BrowserModule,
    AppRoutingModule,
    // ------ Added by me for reactive forms:
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule { }

