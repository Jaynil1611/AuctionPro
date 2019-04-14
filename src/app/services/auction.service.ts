import { Injectable } from '@angular/core';
import { WebsocketService } from './websocket.service';
import { Subject,Observable } from 'rxjs';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class AuctionService {
  addAuctionProducts(msg) {
    msg["type"]="selected_products";
    this.messages.next(msg);
  }
  startAuction(msg) {
    msg["type"]="start_auction";
    this.messages.next(msg);
  }
  endAuction(msg){
    msg["type"]="end_auction";
    this.messages.next(msg);
  }
  deleteProducts(msg) {
    msg["type"]="delete_user_products";
    this.messages.next(msg);
  }
  // Actions on Auction Data
  getAuctionById(msg) {
    msg["type"]="auction_by_id";
    this.messages.next(msg);
  }
  getAllAuctions(msg){
    msg["type"]="auction";
    this.messages.next(msg);
  }
  getAuctionsByUserId(msg)
  {
    // console.log(msg);
    msg["type"]="auction_by_userid";
    this.messages.next(msg);
  }
  addAuction(msg)
  {
    msg["type"]="auction_create";
    this.messages.next(msg);
  }
  joinAuction(msg){
    msg["type"]="auction_join";
    this.messages.next(msg);
  }
  leaveAuction(msg){
    msg["type"]="auction_leave";
    this.messages.next(msg);
  }
  getEnrolledAuctions(msg){
    msg["type"]="auction_user";
    this.messages.next(msg);
  }
  messages:Subject<any>;
  // Products:Subject<any>;

  constructor(private wsService: WebsocketService) {
    this.messages = <Subject<any>>wsService
      .connect().pipe(
        map((response: any): any => {
        return response;
      }));
      
   }
  sendMsg(msg) {
    msg["type"]="message";
    this.messages.next(msg);
  }
  doBid(msg){
    msg["type"]="bid";
    this.messages.next(msg);
  }
  getProducts(msg){
    msg["type"]="auction_products";
    this.messages.next(msg);
  }
  
  addProducts(msg)
  {
    msg["type"]="product_create";
    this.messages.next(msg);
  }
  
  getProductsByUserId(msg)
  {
    msg["type"]="user_products";
    this.messages.next(msg); 
  }
    
}
