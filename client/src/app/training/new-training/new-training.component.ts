import { Component, OnInit} from '@angular/core';
import { TrainingService } from '../training.service';
import { NgForm } from '@angular/forms';
import { Exercise } from '../exercise.model';
import { AngularFirestore} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map} from 'rxjs/operators';
@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css']
})
export class NewTrainingComponent implements OnInit {
  trainingTypes: Observable<Exercise[]>
  constructor(private trainingService:TrainingService,private readonly db:AngularFirestore) { }

  ngOnInit(){
   this.trainingTypes=this.db
    .collection("avalaibleExercise")

    .snapshotChanges()
    .pipe(map(docArray=>{
     return  docArray.map(a=>{
       const data = a.payload.doc.data() as Exercise;
       const id = a.payload.doc.id;
       return {id, ...data};

      })
    }))

 }
  onStartTraining(form:NgForm){
    console.log(form)
    this.trainingService.startExercise(form.value.exercise)
  }
}
