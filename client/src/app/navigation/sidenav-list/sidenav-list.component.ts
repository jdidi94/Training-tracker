import { Component, OnInit,EventEmitter,Output,OnDestroy} from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidenav-list.component.css']
})
export class SidenavListComponent implements OnInit, OnDestroy {

@Output() sidenavList= new EventEmitter<void>()
isAuth=false
authSubscription:Subscription
  constructor(private authService:AuthService) { }

  ngOnInit(): void {
   this.authSubscription= this.authService.authChange.subscribe(status=>{
      this.isAuth=status
    })
  }
toggleNav(){
this.sidenavList.emit()
}
ngOnDestroy(){
  this.authSubscription.unsubscribe()
}
onLogout(){
  this.authService.logout()

}

}
