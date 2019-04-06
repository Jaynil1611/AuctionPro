import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
@Injectable({
  providedIn: 'root'
})
export class UserService {

  registerUser(Username:String,Password:String){
    let body = {
      "Username":Username,
      "Password":Password
    }
    return this.http.post('http://localhost:3000/api/Users',body);
  }

  addAddress(UserId,Address){
    Address["User_Id"]=UserId;
    return this.http.post("http://localhost:3000/api/Address",Address);
  }
  
  addUserDetails(UserId,UserDetails){
    UserDetails["User_Id"]=UserId;
    return this.http.post("http://localhost:3000/api/User_details",UserDetails);
  }
  
  getUserDetails(UserId){
    return this.http.get("http://localhost:3000/api/Users/"+UserId);
  }

  constructor(private http:HttpClient) { }

}
