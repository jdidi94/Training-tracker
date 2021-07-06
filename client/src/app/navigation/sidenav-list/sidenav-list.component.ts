import { Component, OnInit,EventEmitter,Output,OnDestroy} from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import * as fromRoot from "../../app.reducers"


@Component({
  selector: 'app-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidenav-list.component.css']
})
export class SidenavListComponent implements OnInit {

@Output() sidenavList= new EventEmitter<void>()
isAuth$:Observable<Boolean>
  constructor(private authService:AuthService,private store:Store<fromRoot.State>) { }

  ngOnInit(): void {
    this.isAuth$=this.store.select(fromRoot.getIsAuth)
  }

toggleNav(){
this.sidenavList.emit()
}
// ngOnDestroy(){
//   this.authSubscription.unsubscribe()
// }
onLogout(){
  this.authService.logout()

}

}
