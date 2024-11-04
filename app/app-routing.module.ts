import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TesterComponent } from './tester/tester.component';
import { CreateticketComponent } from './createticket/createticket.component';
import { TesterloginComponent } from './testerlogin/testerlogin.component';
import { HomeComponent } from './components/home/home.component';
import { ProjectmanagerComponent } from './components/projectmanager/projectmanager.component';
import { CreateProjComponent } from './components/create-proj/create-proj.component';
import { CreateemployeeComponent } from './components/createemployee/createemployee.component';
import { ShowallemployeeComponent } from './components/showallemployee/showallemployee.component';
import { ShowallprojectComponent } from './components/showallproject/showallproject.component';
import { ShowallticketsComponent } from './components/showalltickets/showalltickets.component';
import { AssignprojectComponent } from './components/assignproject/assignproject.component';
import { PmloginComponent } from './components/pmlogin/pmlogin.component';

import { DevloginComponent } from './components/devlogin/devlogin.component';
import { DeveloperComponent } from './components/developer/developer.component';




const routes: Routes = [

  { path: 'projectmanager', component: ProjectmanagerComponent },
 {path:'Homepm',component:ProjectmanagerComponent,children:[
  
 ]},
  { path: '', redirectTo: '/home', pathMatch: 'full' },
 { path: 'employee', component:CreateemployeeComponent },
 { path: 'showemployee', component:ShowallemployeeComponent },
 { path: 'showproject', component:ShowallprojectComponent },
 { path: 'showticket', component:ShowallticketsComponent},
 { path: 'assignproject', component:AssignprojectComponent},
 { path:'',component:HomeComponent},
 {path:'PmLogin',component:PmloginComponent},
 {path:'home',component:HomeComponent},
{path:'testerlogin',component:TesterloginComponent},
{path:'tester',component:TesterComponent},
{path:'createticket',component:CreateticketComponent},
{ path: 'details', component:CreateProjComponent },
 {path:'developerlogin',component:DevloginComponent },
  {path:'developer',component:DeveloperComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
