import { Component , OnInit} from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

import { AuthService } from "../services/auth.service";
import { Users } from '../models';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit{
  currentUser: Users;
  currentUserSubscription: Subscription;
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );
  
  ngOnInit(){
  }
  logout(){
    console.log("logout()");
    this.authService.logout();
  }
  login(){
    console.log("login()");
  }
  constructor(private breakpointObserver: BreakpointObserver ,private authService:AuthService) {
    this.currentUserSubscription=authService.currentUser.subscribe(user=>{
      this.currentUser=user;
    })
  }

}
