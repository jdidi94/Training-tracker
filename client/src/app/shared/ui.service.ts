import { MatSnackBar } from "@angular/material/snack-bar";
import { Subject } from "rxjs";
import { Injectable } from "@angular/core";
@Injectable()
export class UiService{
  loadingStateChanged=new Subject<boolean>()
  constructor(private matSnackBar:MatSnackBar){

  }
  showSnackbar(message,action,duration){
   this.matSnackBar.open(message,action,{
    duration:duration
   })
  }
}
