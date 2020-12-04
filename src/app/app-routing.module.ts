import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {path:'',redirectTo:"welcome",pathMatch:"full"},
  { path: 'add', loadChildren: () => import('./add/add.module').then(m => m.AddModule) },
 { path: 'list', loadChildren: () => import('./list/list.module').then(m => m.ListModule) }, 
 { path: 'welcome', loadChildren: () => import('./welcome/welcome.module').then(m => m.WelcomeModule) },
  { path: 'success', loadChildren: () => import('./success/success.module').then(m => m.SuccessModule) },
  { path: 'empty', loadChildren: () => import('./empty/empty.module').then(m => m.EmptyModule) },
  { path: '**', loadChildren: () => import('./pagenotfound/pagenotfound.module').then(m => m.PagenotfoundModule) }]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
