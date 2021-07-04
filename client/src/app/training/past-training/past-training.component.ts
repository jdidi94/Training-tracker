import {  Component, OnInit,ViewChild,AfterViewInit } from '@angular/core';
import { MatTableDataSource} from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { Exercise } from '../exercise.model';
import { TrainingService } from '../training.service';
import { MatPaginator } from '@angular/material/paginator';
@Component({
  selector: 'app-past-training',
  templateUrl: './past-training.component.html',
  styleUrls: ['./past-training.component.css']
})
export class PastTrainingComponent implements OnInit ,AfterViewInit {
  displayedColumns=["date","name","duration","calories","state"]
  dataSource= new MatTableDataSource<Exercise>()
  @ViewChild(MatSort) sort:MatSort
  @ViewChild(MatPaginator) paginator:MatPaginator
  constructor(private trainingService:TrainingService) { }

  ngOnInit(){
    this.dataSource.data=this.trainingService.getCompletedOrCancelledExercises()
    console.log("hooooo",this.dataSource.data)
  }
  ngAfterViewInit():void{
    this.dataSource.sort=this.sort
    this.dataSource.paginator=this.paginator
  }
  doFilter(filterValue):void{
    this.dataSource.filter=filterValue.trim().toLocaleLowerCase()
}
}
