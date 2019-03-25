import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { MatStepper } from '@angular/material';
import { UserService } from "../../services/user.service";
import { error } from 'util';
@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  User_id;
  isLinear = true;
  isEditable = false;
  Users: FormGroup;
  AddressForm: FormGroup;
  UserDetails: FormGroup;

  constructor(private _formBuilder: FormBuilder , private userService: UserService) {}

  ngOnInit() {
    this.Users = this._formBuilder.group({
      Username: ['', Validators.required],
      Password: ['', Validators.required],
      RetypePassword: ['', Validators.required]
    });
    this.AddressForm = this._formBuilder.group({
      First_line: [null, Validators.required],
      Second_line: null,
      City: [null, Validators.required],
      State: [null, Validators.required],
      Country: [null, Validators.required]
    });
    this.UserDetails = this._formBuilder.group({
      First_name: [null,Validators.required],
      Last_name: [null,Validators.required],
      Email: [null,Validators.required],
      Contact_no:[null,Validators.required]
    });
  }

  tryRegister(fg:FormGroup,stepper:MatStepper){
    if(fg.valid){
      this.userService.registerUser(fg.value['Username'],fg.value['Password'])
      .subscribe(
        res=>{
          console.log("res"+JSON.stringify(res));
          this.User_id=res;
          stepper.next();
        },
        error=>{
          console.log(error);
          if(error["status"]=409)
            alert(error['error']);
        }
      )
    }
  }
  setAddress(fg:FormGroup,stepper:MatStepper){
    if(fg.valid){
      console.log(fg.value);
      this.userService.addAddress(this.User_id,fg.value)
      .subscribe(
        res=>{
          console.log("Address : "+JSON.stringify(res))
          stepper.next();
        },
        error=>{
          console.log(error);
        }
      )
    }
  }

  setUserDetails(fg:FormGroup,stepper:MatStepper){
    if(fg.valid){
      console.log(fg.value);
      this.userService.addUserDetails(this.User_id,fg.value)
      .subscribe(
        res=>{
          console.log("UserDetails : "+JSON.stringify(res))
          stepper.next();
        },
        error=>{
          console.log(error);
        }
      )
    }
  }


}
