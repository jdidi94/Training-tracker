import {User} from "./user.model"
import { AuthData } from "./auth-data.model"
import { Subject } from 'rxjs';
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import {AngularFireAuth} from '@angular/fire/auth'
import { TrainingService } from "../training/training.service";
import { MatSnackBar } from "@angular/material/snack-bar";
import { UiService } from "../shared/ui.service";
import { Store } from "@ngrx/store";
import * as fromRoot from "../app.reducers"
import * as UI from "../shared/ui.action"
import * as Auth from "./auth.action"
@Injectable()
export class AuthService{
  private user:User;
  authChange=new Subject<boolean>()
  private isAthenticated=false
  constructor(private router:Router,
              private afAuth:AngularFireAuth,
              private trainingService:TrainingService,
              private snackBar:MatSnackBar,
              private uiService:UiService,
              private store:Store<fromRoot.State>
    ){}
  initAuthListener(){
    this.afAuth.authState.subscribe(user=>{
      if (user){
        this.store.dispatch(new Auth.SetAuthenticated())
        this.router.navigate(['/training'])
      }else{
        this.trainingService.cancelSubscription()
        this.store.dispatch(new Auth.SetUnauthenticated())
        this.router.navigate(['/login'])

      }
    })
  }

  registerUser(authData:AuthData){
    // this.uiService.loadingStateChanged.next(true)
    this.store.dispatch(new UI.StartLoading())
    this.afAuth.createUserWithEmailAndPassword(authData.email,authData.password)
    .then(result=>{
    //  this.uiService.loadingStateChanged.next(false)
    this.store.dispatch(new UI.StopLoading())

    })
    .catch(err=>{
    //  this.uiService.loadingStateChanged.next(false)
    this.store.dispatch(new UI.StopLoading())

     this.uiService.showSnackbar(err.message,null,3000)
    })
 }
  login(authData:AuthData){
    //  this.uiService.loadingStateChanged.next(true)
    this.store.dispatch(new UI.StartLoading())

     this.afAuth.signInWithEmailAndPassword(authData.email,authData.password)
     .then(result=>{
    //  this.uiService.loadingStateChanged.next(false)
    this.store.dispatch(new UI.StopLoading())


  })
    .catch(err=>{
    //  this.uiService.loadingStateChanged.next(false)
    this.store.dispatch(new UI.StopLoading())

     this.uiService.showSnackbar(err.message,null,3000)
   })
  }
 logout(){
   this.afAuth.signOut()
}



}
