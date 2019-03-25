import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from "@angular/router";
import { AuthService } from "../../services/auth.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm=this.fb.group({
    Username: [null,Validators.required],
    Password: [null,Validators.required]
  });



  constructor(private fb: FormBuilder,private authService:AuthService,private router:Router) {}

  onSubmit() {
    this.authService.doLogin(this.loginForm.value)
    .subscribe(
      res=>{
        console.log("Address : "+JSON.stringify(res));
        this.router.navigate(['/']);
      },
      error=>{
        console.log(error);
      }
    )
  }
}
