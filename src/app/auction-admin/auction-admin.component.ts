import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AuctionService } from '../services/auction.service';

@Component({
  selector: 'app-auction-admin',
  templateUrl: './auction-admin.component.html',
  styleUrls: ['./auction-admin.component.css']
})
export class AuctionAdminComponent implements OnInit {

  constructor(private fb:FormBuilder,
      private aucadmin: AuctionService) { }
    Auctions =[];
    Auction:FormGroup;
  ngOnInit() {
    this.Auction=this.fb.group({
      Title:['',Validators.required],
      Auction_description:['',Validators.required],
      Start_time:['',Validators.required],
      End_time:['',Validators.required]
    })
    this.aucadmin.getAuctionsByUserId({content : JSON.parse(localStorage.currentUser).User_Id});
    this.aucadmin.messages.subscribe(res=>
      {
        switch (res["type"])
         {
          case "auction_by_userid":
            console.log(res);
            this.Auctions=res["content"];
            break;
          case "auction_create":
          this.Auctions.push(res);
          break;
          default:
            break;
        }
      })

    
    
  }

  addAuctions(fg:FormGroup)
  {
    console.log(fg);
    if(fg.valid)
    {
      let Auction=fg.value;
      Auction["Created_by"]=JSON.parse(localStorage.currentUser).User_Id;
      Auction["Start_time"]=new Date(Auction["Start_time"]).toISOString().slice(0,19).replace('T',' ');
      Auction["End_time"]=new Date(Auction["End_time"]).toISOString().slice(0,19).replace('T',' ');
      Auction["Created_at"]=new Date().toISOString().slice(0,19).replace('T',' ');
      console.log(Auction);
      this.aucadmin.addAuction(Auction);

    }
  }

}
