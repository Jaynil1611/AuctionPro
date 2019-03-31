import { Component, OnInit } from '@angular/core';
import { AuctionService } from '../services/auction.service';

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

  products:Product[]=[]
  constructor(private auctionService:AuctionService) { }

  ngOnInit() {
    this.auctionService.messages.subscribe(
      msg=>{
        console.log(msg);
        switch (msg["type"]) {
          case "bid":
            let i = this.products.findIndex((e)=>{return e.Product_Id==msg["content"]["Product_Id"]});
            console.log(this.products[i].Base_price=msg["content"]["Base_price"]);
            break;
          case "auction_products":
            this.products=msg["content"];
            break;
          default:
            break;
        }
      }
    )
    this.auctionService.getProducts({"content":1});
  }



  sendMessage() {
    this.auctionService.sendMsg({content:"Test Message"});
  }
  
  doBid(product:Product){
    this.auctionService.doBid({"Product_Id":product.Product_Id,"User_Id":JSON.parse(localStorage.currentUser).User_Id,"Bid_amount":product.Base_price+500});
  }
}
