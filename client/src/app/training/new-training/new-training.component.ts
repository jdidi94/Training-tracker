import { Component, OnInit,OnDestroy} from '@angular/core';
import { TrainingService } from '../training.service';
import { NgForm } from '@angular/forms';
import { Exercise } from '../exercise.model';
import { AngularFirestore} from '@angular/fire/firestore';
import { Observable,Subscription } from 'rxjs';
import { map} from 'rxjs/operators';
import { StoreModule } from '@ngrx/store';
import * as fromRoot from '../../app.reducers'
import { UiService } from '../../shared/ui.service';
import { Store } from '@ngrx/store';



@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css']
})
export class NewTrainingComponent implements OnInit{
  trainingTypes: Exercise[]
  exerciseSubscription: Subscription
  isLoading$:Observable<boolean>;
  private loadingsub:Subscription
  constructor(private trainingService:TrainingService,
              private  uiService:UiService,
              private store:Store<fromRoot.State>
              ) { }

  ngOnInit(){

  this.exerciseSubscription= this.trainingService.exercisesChanged.subscribe(exercise=>
    this.trainingTypes=exercise
  )
   this.fetchExercises()
  //  this.loadingsub=this.uiService.loadingStateChanged.subscribe(isLoading=>{
  //   this.isLoading=isLoading
  // })
  this.isLoading$=this.store.select(fromRoot.getIsloading)

 }
  onStartTraining(form:NgForm){
    console.log(form)
    this.trainingService.startExercise(form.value.exercise)
  }
  fetchExercises(){
   this.trainingService.fetchAvalaibleExercises()

  }
//   ngOnDestroy(){
//     if(this.exerciseSubscription){
//       this.exerciseSubscription.unsubscribe()
//    } if(this.loadingsub){
//       this.loadingsub.unsubscribe()
//      }
//  }
}
