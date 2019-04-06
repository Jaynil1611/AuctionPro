import { Component, OnInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AuctionAdminService } from '../services/auction-admin.service';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatSort, MatTableDataSource} from '@angular/material';
import { ProductService } from '../services/product.service';
@Component({
  selector: 'app-auction-admin',
  templateUrl: './auction-admin.component.html',
  styleUrls: ['./auction-admin.component.css']
})
export class AuctionAdminComponent implements OnInit {
  constructor(private fb:FormBuilder,
      private aucadmin: AuctionAdminService,
      private prods : ProductService) { }

    Auctions =[];
    ProductG =[];
    ProductSelect=[];
    Auction:FormGroup;
    panelOpenState = false;

  ngOnInit() {
    this.Auction=this.fb.group({
      Title:['',Validators.required],
      Auction_description:['',Validators.required],
      Start_time:['',Validators.required],
      End_time:['',Validators.required]
    })

    this.aucadmin.getAuctions({content : JSON.parse(localStorage.currentUser).User_Id});
    this.aucadmin.messages.subscribe(res=>
      {
        switch (res["type"])
         {
          case "auction_get":
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

      this.prods.messages.subscribe(res=>
        {
          if(res["type"]="user_products")  
          {
            console.log(res);
            this.ProductG=res["content"];
            // this.ProductSelect=res["content"];
          }
        })
        this.prods.getUserProducts({"content":JSON.parse(localStorage.currentUser).User_Id});

    
        
  }
  
  displayedColumns: string[] = ["Auction_Id","Title","Auction_description","Created_by","Created_at","Created_by","Start_time","End_time"];
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

  drop(event: CdkDragDrop<any[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
                        event.container.data,
                        event.previousIndex,
                        event.currentIndex);
    }
  }

}
