  import { Exercise } from "./exercise.model";
  import { Subject,Subscription } from "rxjs";
  import { Injectable } from "@angular/core";
  import { AngularFirestore} from '@angular/fire/firestore';
  import { map} from 'rxjs/operators';
  import { UiService } from "../shared/ui.service";
  import * as fromRoot from "../app.reducers"
  import * as UI from "../shared/ui.action"
   import { Store } from "@ngrx/store";
@Injectable()
export class TrainingService{
exercisesChanged= new Subject<Exercise[]>()
exerciseChanged= new Subject<Exercise>()
finishExercisesChanged=new Subject<Exercise[]>()
private avalaibleExercises :Exercise[]=[]
private fbsubs:Subscription[]=[]
private runningExercise:Exercise
constructor( private db:AngularFirestore,
             private uiService:UiService,
             private store:Store<fromRoot.State>
  ){}
fetchAvalaibleExercises(){
  // this.uiService.loadingStateChanged.next(true)
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
      this.avalaibleExercises=ex
       this.exercisesChanged.next([...this.avalaibleExercises])

    },error=>{
      this.store.dispatch(new UI.StopLoading)
      this.uiService.showSnackbar("Fetching exercise failed",null,3000)
      this.exercisesChanged.next(null)
    }
    ))
}
startExercise(selectedId:string){

   this.runningExercise=this.avalaibleExercises.find(ex=>ex.id===selectedId)
   this.exerciseChanged.next({...this.runningExercise})
}
completeExercise(){
  const data={
    id:this.runningExercise["id"],
    name:this.runningExercise["name"],
    duration:this.runningExercise["duration"],
    calories:this.runningExercise["calories"]
  } as Exercise
  this.addDataToDatabase({...data,date:new Date(),state:"completed"})
  this.runningExercise=null
  this.exerciseChanged.next(null)

}
cancelExercise(progress:number){
  const data3={
    id:this.runningExercise["id"],
    name:this.runningExercise["name"],
    duration:this.runningExercise["duration"],
    calories:this.runningExercise["calories"]
  } as Exercise
  this.addDataToDatabase({...data3,
    duration:(this.runningExercise['duration'] *(progress/100)),
    calories:this.runningExercise["calories"] *(progress/100),
    date:new Date(),
    state:"cancelled"})
  this.runningExercise=null
  this.exerciseChanged.next(null)
}
getRunningExercise(){
  return {...this.runningExercise}
}
fetchCompletedOrCancelledExercises(){
  this.fbsubs.push( this.db
    .collection("finishedExercises")
    .valueChanges()
    .subscribe((exercices:Exercise[])=>{
     this.finishExercisesChanged.next(exercices)
   }))
}
private addDataToDatabase(exercise:Exercise){
  this.db.collection('finishedExercises').add(exercise)
}
cancelSubscription(){
  this.fbsubs.forEach(sub=>sub.unsubscribe())
}
}
