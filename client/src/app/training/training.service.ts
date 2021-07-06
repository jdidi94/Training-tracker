  import { Exercise } from "./exercise.model";
  import { Subscription } from "rxjs";
  import { Injectable } from "@angular/core";
  import { AngularFirestore} from '@angular/fire/firestore';
  import { map} from 'rxjs/operators';
  import { UiService } from "../shared/ui.service";
  import * as fromRoot from "../app.reducers"
  import * as UI from "../shared/ui.action"
  import { Store } from "@ngrx/store";
  import * as Training from "./training.action"
  import * as fromTraining from './training.reducer'
  import { take } from "rxjs/operators";

@Injectable()
export class TrainingService{
private fbsubs:Subscription[]=[]

constructor( private db:AngularFirestore,
             private uiService:UiService,
             private store:Store<fromTraining.State>
  ){}
fetchAvalaibleExercises(){
  this.store.dispatch(new UI.StartLoading)

 this.fbsubs.push( this.db
    .collection("avalaibleExercise")
    .snapshotChanges()
    .pipe(map(docArray=>{
     return  docArray.map(a=>{
       const data = a.payload.doc.data() as Exercise;
       const id = a.payload.doc.id;
       return {id, ...data};

      })
    })).subscribe((ex:Exercise[])=>{
      this.store.dispatch(new UI.StopLoading)
      this.store.dispatch(new Training.SetAvalaibleTraining(ex))

    },error=>{
      this.store.dispatch(new UI.StopLoading)
      this.uiService.showSnackbar("Fetching exercise failed",null,3000)

    }
    ))
}
startExercise(selectedId:string){
  this.store.dispatch(new Training.StartTraining(selectedId))

}
completeExercise(){
  this.store.select(fromTraining.getActiveTraining).pipe(take(1)).subscribe(ex=>{
  this.addDataToDatabase({...ex,date:new Date(),state:"completed"})
  this.store.dispatch(new Training.StopTraining())
  })


}
cancelExercise(progress:number){
  this.store.select(fromTraining.getActiveTraining).pipe(take(1)).subscribe(ex=>{

    this.addDataToDatabase({...ex,
      duration:(ex.duration*(progress/100)),
      calories:ex.calories *(progress/100),
      date:new Date(),
      state:"cancelled"})
    this.store.dispatch(new Training.StopTraining())

  })

}

fetchCompletedOrCancelledExercises(){
  this.fbsubs.push( this.db
    .collection("finishedExercises")
    .valueChanges()
    .subscribe((exercices:Exercise[])=>{
      this.store.dispatch(new Training.SetFinishedTraining(exercices))
   }))
}
private addDataToDatabase(exercise:Exercise){
  this.db.collection('finishedExercises').add(exercise)
}
cancelSubscription(){
  this.fbsubs.forEach(sub=>sub.unsubscribe())
}
}
