import { Component, OnInit } from '@angular/core';
import { AuctionService } from '../services/auction.service';
import { element } from '@angular/core/src/render3';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  Auctions=[]
  Auctions_With_Me=[]
  isLogged: any;
  constructor(private auctionService:AuctionService) { }

  ngOnInit(){
    this.isLogged=JSON.parse(localStorage.currentUser);
    console.log(this.isLogged);
    this.auctionService.messages.subscribe(
      msg=>{
        switch (msg["type"]) {
          case "auction":
            this.Auctions=msg["content"];
            console.log(this.Auctions);
            break;
          case "auction_user":
            this.Auctions_With_Me=msg["content"];
            break;
          case "auction_create":
            this.Auctions.push(msg["content"]);
            break;
          case "auction_join":
            console.log(msg["content"]);
            console.log(this.Auctions.splice(this.Auctions.findIndex((element,index,array)=>{
              return (element==msg["content"]["Auction_Id"]);
            })),1);
            this.Auctions_With_Me.push(msg["content"]);
            break;
          case "auction_leave":
            this.Auctions_With_Me.splice(this.Auctions_With_Me.findIndex((element,index,array)=>{
              return (element==msg["content"]["Auction_Id"]);
            }))
            this.Auctions.push(msg["content"]);
            break;
          default:
            break;
        }
      }
    )
    this.auctionService.getAllAuctions({content:JSON.parse(localStorage.currentUser).User_Id});
    this.auctionService.getEnrolledAuctions({content:JSON.parse(localStorage.currentUser).User_Id});
  }

  joinAuction(msg){
    msg["User_Id"]=JSON.parse(localStorage.currentUser).User_Id;
    this.auctionService.joinAuction(msg);
  }
  leaveAuction(msg){
    msg["User_Id"]=JSON.parse(localStorage.currentUser).User_Id;
    this.auctionService.leaveAuction(msg);
  }
}
