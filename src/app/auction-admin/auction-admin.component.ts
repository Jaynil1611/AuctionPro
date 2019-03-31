import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: 'app-auction-admin',
  templateUrl: './auction-admin.component.html',
  styleUrls: ['./auction-admin.component.css']
})
export class AuctionAdminComponent implements OnInit {

  constructor(private fb:FormBuilder) { }

  Auction:FormGroup;
  ngOnInit() {
    this.Auction=this.fb.group({
      Title:['',Validators.required],
      Description:['',Validators.required],
      Start_time:['',Validators.required],
      End_time:['',Validators.required]
    })
  }

}
