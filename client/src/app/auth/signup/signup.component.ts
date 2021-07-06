import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';
import { UiService } from '../../shared/ui.service';
import { Observable, Subscription } from 'rxjs';
import * as fromRoot  from '../../app.reducers'
import { Store } from '@ngrx/store';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit{
 maxDate=new Date();
 isLoading$:Observable<boolean>;

 private loadingSub:Subscription
  constructor(private authService:  AuthService,
              private uiService:UiService,
              private store:Store<fromRoot.State>

    ) { }

  ngOnInit(): void {
    this.isLoading$=this.store.select(fromRoot.getIsloading)
    this.maxDate.setFullYear(this.maxDate.getFullYear()-18)
  }
  onSubmit(form:NgForm){
 this.authService.registerUser({
   email:form.value.email,
   password:form.value.password
 })

}
// ngOnDestroy(){
//   if(this.loadingSub){
//     this.loadingSub.unsubscribe()

//   }

}

