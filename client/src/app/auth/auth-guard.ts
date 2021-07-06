import { importType } from "@angular/compiler/src/output/output_ast";
import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate,CanLoad,RouterStateSnapshot ,Route} from "@angular/router";
import { AuthService } from "./auth.service";
import { Router } from "@angular/router";


@Injectable()
export class AuthGuard implements CanActivate,CanLoad{
 constructor(private authService:AuthService,private router:Router){
 }

  canActivate(route:ActivatedRouteSnapshot,state:RouterStateSnapshot){
   if(this.authService.isAuth()){
     return true
   } else{
     return this.router.navigate(['/login'])
   }
}
canLoad(route:Route){
  if(this.authService.isAuth()){
    return true
  } else{
    return this.router.navigate(['/login'])
  }
}

}
