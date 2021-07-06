import {  Component, OnInit,ViewChild,AfterViewInit, OnDestroy } from '@angular/core';
import { MatTableDataSource} from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { Exercise } from '../exercise.model';
import { TrainingService } from '../training.service';
import { MatPaginator } from '@angular/material/paginator';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-past-training',
  templateUrl: './past-training.component.html',
  styleUrls: ['./past-training.component.css']
})
export class PastTrainingComponent implements OnInit ,AfterViewInit,OnDestroy {
  displayedColumns=["date","name","duration","calories","state"]
  dataSource= new MatTableDataSource<Exercise>()
  @ViewChild(MatSort) sort:MatSort
  @ViewChild(MatPaginator) paginator:MatPaginator
  finishedSubscription:Subscription
  constructor(private trainingService:TrainingService) { }

  ngOnInit(){
    this.finishedSubscription= this.trainingService.finishExercisesChanged.subscribe((exercise:Exercise[])=>{
      this.dataSource.data=exercise
    })
    this.trainingService.fetchCompletedOrCancelledExercises()
    console.log("hooooo",this.dataSource.data)
  }
  ngAfterViewInit():void{
    this.dataSource.sort=this.sort
    this.dataSource.paginator=this.paginator
  }
  doFilter(filterValue):void{
    this.dataSource.filter=filterValue.trim().toLocaleLowerCase()
}
ngOnDestroy(){
  if(this.finishedSubscription){
   this.finishedSubscription.unsubscribe()
  }
}
}
