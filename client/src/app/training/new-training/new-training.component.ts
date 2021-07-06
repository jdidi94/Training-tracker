import { Component, OnInit,OnDestroy} from '@angular/core';
import { TrainingService } from '../training.service';
import { NgForm } from '@angular/forms';
import { Exercise } from '../exercise.model';
import { Observable } from 'rxjs';
import { map} from 'rxjs/operators';
import { StoreModule } from '@ngrx/store';
import * as fromTraining from '../training.reducer'
import { UiService } from '../../shared/ui.service';
import { Store } from '@ngrx/store';
import * as fromRoot from "../../app.reducers"



@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css']
})
export class NewTrainingComponent implements OnInit{
  trainingTypes$: Observable<Exercise[]>
  isLoading$:Observable<boolean>;

  constructor(private trainingService:TrainingService,
              private  uiService:UiService,
              private store:Store<fromTraining.State>
              ) { }

  ngOnInit(){

    this.trainingTypes$=this.store.select(fromTraining.getAvailableTraining)
    this.fetchExercises()
    this.isLoading$=this.store.select(fromRoot.getIsloading)


 }
  onStartTraining(form:NgForm){
    console.log(form)
    this.trainingService.startExercise(form.value.exercise)
  }
  fetchExercises(){
   this.trainingService.fetchAvalaibleExercises()

  }

}
