import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material/dialog'
import { TrainingService } from '../training.service';
import { stopTrainingComponent } from './stop-training.component';
import { Store } from '@ngrx/store';
import * as fromTraining from "../training.reducer"
import { take } from 'rxjs/operators';
@Component({
  selector: 'app-current-training',
  templateUrl: './current-training.component.html',
  styleUrls: ['./current-training.component.css']
})
export class CurrentTrainingComponent implements OnInit {
progrees=0
timer:number
  constructor(private dialog:MatDialog,private trainingService:TrainingService,private store:Store<fromTraining.State>) { }

  ngOnInit() {
    this.startOrResumeTimer()
  }
  startOrResumeTimer(){
    this.store.select(fromTraining.getActiveTraining).pipe(take(1)).subscribe(ex=>{

      const step=ex.duration/100 *1000;

        this.timer = setInterval(()=>{
          this.progrees=this.progrees+1
          if(this.progrees>=100){
            this.trainingService.completeExercise()
            clearInterval(this.timer)
          }
        },step)
    })
  }
onStop(){
  clearInterval(this.timer)
  const dialogRef=this.dialog.open(stopTrainingComponent,{
    data:{
      progress:this.progrees
    }
  })
  dialogRef.afterClosed().subscribe(result=>{
    if(result){
      this.trainingService.cancelExercise(this.progrees)

    }else{
      this.startOrResumeTimer()
    }
  })
 }
}
