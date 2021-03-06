import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TrainingsModule } from './training/training.module';
import { WelcomeComponent } from './welcome/welcome.component';
import { AuthGuard } from './auth/auth-guard';
const routes: Routes = [
  {
    path:"",
    component:WelcomeComponent
  },
  {
    path: "training",
    loadChildren:() => TrainingsModule,
    canLoad:[AuthGuard]
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers:[AuthGuard]
})
export class AppRoutingModule { }
