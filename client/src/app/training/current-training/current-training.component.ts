import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material/dialog'
import { TrainingService } from '../training.service';
import { stopTrainingComponent } from './stop-training.component';
@Component({
  selector: 'app-current-training',
  templateUrl: './current-training.component.html',
  styleUrls: ['./current-training.component.css']
})
export class CurrentTrainingComponent implements OnInit {
progrees=0
timer:number
  constructor(private dialog:MatDialog,private trainingService:TrainingService) { }

  ngOnInit() {
    this.startOrResumeTimer()
  }
  startOrResumeTimer(){
  const step=this.trainingService.getRunningExercise().duration/100 *1000;

    this.timer = setInterval(()=>{
      this.progrees=this.progrees+1
      if(this.progrees>=100){
        this.trainingService.completeExercise()
        clearInterval(this.timer)
      }
    },step)
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
