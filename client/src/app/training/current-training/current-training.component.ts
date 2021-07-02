import { Component, OnInit,EventEmitter,Output } from '@angular/core';
import {MatDialog} from '@angular/material/dialog'
import { stopTrainingComponent } from './stop-training.component';
@Component({
  selector: 'app-current-training',
  templateUrl: './current-training.component.html',
  styleUrls: ['./current-training.component.css']
})
export class CurrentTrainingComponent implements OnInit {
@Output() trainingExit=new EventEmitter()
progrees=0
timer:number
  constructor(private dialog:MatDialog) { }

  ngOnInit() {
    this.startOrResumeTimer()
  }
  startOrResumeTimer(){
    this.timer= setInterval(()=>{
      this.progrees=this.progrees+5
      if(this.progrees>=100){
        clearInterval(this.timer)
      }
    },1000)
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
    this.trainingExit.emit()

  }else{
    this.startOrResumeTimer()
  }
 })
 }
}
