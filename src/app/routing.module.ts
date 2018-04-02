import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  { path: '' ,redirectTo: 'speech-to-text', pathMatch: 'full' },
  { path: 'speech-to-text', loadChildren: 'app/features/speech-to-text/index.module#IndexModule' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
