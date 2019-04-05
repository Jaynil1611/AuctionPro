import { Component, OnInit } from '@angular/core';
import { UserService } from '../services';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  constructor(private userService:UserService) { }
  profile:any;
  ngOnInit() {
    this.userService.getUserDetails(JSON.parse(localStorage.currentUser).User_Id).subscribe(res=>{
      console.log(res[0]);
      this.profile=res[0];
    })
  }

}
