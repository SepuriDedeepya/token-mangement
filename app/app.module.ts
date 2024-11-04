import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { TesterComponent } from './tester/tester.component';
import { CreateticketComponent } from './createticket/createticket.component'; 
import { TesterloginComponent } from './testerlogin/testerlogin.component';
///////////
import { ProjectmanagerComponent } from './components/projectmanager/projectmanager.component';
import { CreateProjComponent } from './components/create-proj/create-proj.component';

import { CreateemployeeComponent } from './components/createemployee/createemployee.component';
import { AssignprojectComponent } from './components/assignproject/assignproject.component';
import { ShowallemployeeComponent } from './components/showallemployee/showallemployee.component';
import { ShowallprojectComponent } from './components/showallproject/showallproject.component';
import { ShowallticketsComponent } from './components/showalltickets/showalltickets.component';
import { HomeComponent } from './components/home/home.component';
import { PmloginComponent } from './components/pmlogin/pmlogin.component';
import { ShowprojectmanagerdetailsComponent } from './components/showprojectmanagerdetails/showprojectmanagerdetails.component';
////////////////
import { DevloginComponent } from './components/devlogin/devlogin.component';
import { DeveloperComponent } from './components/developer/developer.component';

@NgModule({
  declarations: [
    AppComponent,
    TesterComponent,
    CreateticketComponent,
    TesterloginComponent,
    /////////
    ProjectmanagerComponent,
    CreateProjComponent,
    CreateemployeeComponent,
    AssignprojectComponent,
    ShowallemployeeComponent,
    ShowallprojectComponent,
    ShowallticketsComponent,
    HomeComponent,
    PmloginComponent,
    ShowprojectmanagerdetailsComponent,
    ///////////////
    DevloginComponent,
    DeveloperComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule // Add this line
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
