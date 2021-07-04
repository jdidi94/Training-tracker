import { Component, OnInit, EventEmitter,Output, OnDestroy } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit,OnDestroy {
 @Output() sidenavToggle=new EventEmitter<void>()
 isAuth=false
 authSubscription:Subscription
  constructor(private authService:AuthService) { }

  ngOnInit(): void {
   this.authSubscription= this.authService.authChange.subscribe(status=>{
      this.isAuth=status
    })
  }
onToggle(){
  this.sidenavToggle.emit()
}
ngOnDestroy(){
  this.authSubscription.unsubscribe()
}
onLogout(){
  this.authService.logout()
}
}
