import { Component, OnInit, EventEmitter,Output, OnDestroy } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { Observable  } from 'rxjs';
import * as fromRoot from "../../app.reducers"
import { Store } from '@ngrx/store';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{
 @Output() sidenavToggle=new EventEmitter<void>()
 isAuth$:Observable<boolean>

  constructor(private store:Store<fromRoot.State>,private authService:AuthService) { }

  ngOnInit(): void {
     this.isAuth$=this.store.select(fromRoot.getIsAuth)
  }
onToggle(){
  this.sidenavToggle.emit()
}

onLogout(){
  this.authService.logout()
}
}
