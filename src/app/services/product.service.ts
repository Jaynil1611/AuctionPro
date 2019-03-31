import { Injectable } from '@angular/core';
import { WebsocketService } from './websocket.service';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

 messages : Subject<any>;
  constructor(private wsService: WebsocketService) {
    this.messages = <Subject<any>>wsService
      .connect().pipe(
        map((response: any): any => {
        return response;
      }))

   }
   addProducts(msg)
   {
     msg["type"]="register_product";
     this.messages.next(msg);
   }
   
  getUserProducts(msg)
  {
   msg["type"]="user_products";
   this.messages.next(msg); 
  }
}
