import { Component, OnInit } from '@angular/core';
import { AuctionService } from '../services/auction.service';



@Component({
  selector: 'app-auction',
  templateUrl: './auction.component.html',
  styleUrls: ['./auction.component.css']
})
export class AuctionComponent implements OnInit {
  Auctions_With_Me=[]
  constructor(private auctionService:AuctionService) { }

  ngOnInit() {
    this.auctionService.messages.subscribe(
      msg=>{
        console.log(msg);
        switch (msg["type"]) {
          case "auction_user":
            this.Auctions_With_Me=msg["content"];
            break;
          case "auction_leave":
            this.Auctions_With_Me.splice(this.Auctions_With_Me.findIndex((element,index,array)=>{
              return (element==msg["content"]["Auction_Id"]);
            }))
            break;
          default:
            break;
        }
      }
    )
    this.auctionService.getEnrolledAuctions({content:JSON.parse(localStorage.currentUser).User_Id});
  }
  leaveAuction(msg){
    msg["User_Id"]=JSON.parse(localStorage.currentUser).User_Id;
    this.auctionService.leaveAuction(msg);
  }
}
