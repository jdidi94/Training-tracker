import { NgModule } from "@angular/core";
import { AngularFirestoreModule } from '@angular/fire/firestore';


import { NewTrainingComponent } from "./new-training/new-training.component";
import { PastTrainingComponent } from "./past-training/past-training.component";
import { TrainingComponent } from "./training.component";
import { CurrentTrainingComponent } from "./current-training/current-training.component";
import { stopTrainingComponent } from "./current-training/stop-training.component";
import { SharedModule } from "../shared/shared.module";
import { TraningRoutingModule } from "./training-routing.module";
@NgModule({
  declarations:[
    TrainingComponent,
    CurrentTrainingComponent,
    NewTrainingComponent,
    PastTrainingComponent,
    stopTrainingComponent
  ],
  imports:[

    AngularFirestoreModule,
    SharedModule,
    TraningRoutingModule

  ],
  exports:[],
  entryComponents:[stopTrainingComponent]
})
export class TrainingsModule{}
