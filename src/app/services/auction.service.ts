import { Injectable } from '@angular/core';
import { WebsocketService } from './websocket.service';
import { Subject,Observable } from 'rxjs';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class AuctionService {
  getAuctionDetails(msg) {
    msg["type"]="auction_details";
    this.messages.next(msg);
  }

  messages:Subject<any>;
  // Products:Subject<any>;

  constructor(private wsService: WebsocketService) {
    this.messages = <Subject<any>>wsService
      .connect().pipe(
        map((response: any): any => {
        return response;
      }))
      
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
    
}
