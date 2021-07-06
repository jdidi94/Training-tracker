import { importType } from "@angular/compiler/src/output/output_ast";
import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate,CanLoad,RouterStateSnapshot ,Route} from "@angular/router";
import { Store } from "@ngrx/store";
import * as FromRoot from "../app.reducers"
import { take } from "rxjs/operators";
@Injectable()
export class AuthGuard implements CanActivate,CanLoad{
 constructor( private store:Store<FromRoot.State>
  ){}


  canActivate(route:ActivatedRouteSnapshot,state:RouterStateSnapshot){
    return this.store.select(FromRoot.getIsAuth).pipe(take(1))
 }
  canLoad(route:Route){
     return this.store.select(FromRoot.getIsAuth)


 }
}
