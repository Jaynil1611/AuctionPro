import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { WebsocketService } from './websocket.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuctionAdminService {
  messages:Subject<any>;


  constructor(private wsService: WebsocketService) {
    this.messages = <Subject<any>>wsService
      .connect().pipe(
        map((response: any): any => {
        return response;
      }))
  }
  addAuction(msg)
  {
    msg["type"]="auction_create";
    this.messages.next(msg);
  }
  getAuctions(msg)
  {
    // console.log(msg);
    msg["type"]="auction_get";
    this.messages.next(msg);
  }
}
