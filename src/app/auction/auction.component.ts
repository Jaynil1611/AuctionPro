import { Component, OnInit } from '@angular/core';
import { AuctionService } from '../services/auction.service';
import {MatSnackBar} from '@angular/material';
interface Product{
  Product_Id:number;
  User_Id:number;
  Product_name:string;
  Product_description:string;
  Base_price:number
}


@Component({
  selector: 'app-auction',
  templateUrl: './auction.component.html',
  styleUrls: ['./auction.component.css']
})
export class AuctionComponent implements OnInit {
  i=0;
  myvar;
  products:Product[]=[]
  auction_details={}
  constructor(private auctionService:AuctionService,private snackbar:MatSnackBar) { }

  ngOnInit() {
    this.auctionService.messages.subscribe(
      msg=>{
        console.log(msg);
        switch (msg["type"]) {
          case "bid":
            let i = this.products.findIndex((e)=>{return e.Product_Id==msg["content"]["Product_Id"]});
            console.log(this.products[i].Base_price=msg["content"]["Base_price"]);
            this.snackbar.open(msg["content"]["Username"]+" Bid Rs "+msg["content"]["Base_price"]+ "on product #"+msg["content"]["Product_Id"])
            break;
          case "auction_products":
            this.products=msg["content"];
            break;
          case "auction_details":
            this.auction_details=msg.content[0];
            console.log(this.auction_details);
          default:
            break;
        }
      }
    )
    this.auctionService.getAuctionDetails({"content":1});
    this.auctionService.getProducts({"content":1});
    this.auctionService.getAuctionDetails({"content":1});
    this.myvar=setInterval(()=>{
      if(this.i<this.products.length){
        console.log(this.i);
        this.i++;
      }else{
        clearTimeout(this.myvar);
      }
    },10000)
  }



  sendMessage() {
    this.auctionService.sendMsg({content:"Test Message"});
  }
  
  doBid(product:Product){
    this.auctionService.doBid({"Product_Id":product.Product_Id,"User_Id":JSON.parse(localStorage.currentUser).User_Id,"Bid_amount":product.Base_price+500});
  }
}
