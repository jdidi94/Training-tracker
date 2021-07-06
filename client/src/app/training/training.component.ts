import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { TrainingService } from './training.service';
@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.css']
})
export class TrainingComponent implements OnInit,OnDestroy {
  exerciseSubscription:Subscription
  onGoingTraining=false
constructor(private trainingService:TrainingService) { }

ngOnInit(){
  this.trainingService.exerciseChanged.subscribe(ex=>{
   if(ex){
     this.onGoingTraining=true
   }else{
     this.onGoingTraining=false
   }
    })
  }
  ngOnDestroy(){
    if(this.exerciseSubscription){
      this.exerciseSubscription.unsubscribe()
    }
  }
}
