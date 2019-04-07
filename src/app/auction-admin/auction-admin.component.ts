import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AuctionService } from '../services/auction.service';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import {MatBottomSheet, MatBottomSheetRef} from '@angular/material';
import {MAT_BOTTOM_SHEET_DATA} from '@angular/material';
@Component({
  selector: 'app-auction-admin',
  templateUrl: './auction-admin.component.html',
  styleUrls: ['./auction-admin.component.css']
})
export class AuctionAdminComponent implements OnInit {

  constructor(private fb:FormBuilder,
      private aucadmin: AuctionService,
      private bottomSheet : MatBottomSheet) { }
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
          case "start_auction":
          console.log(res["content"]);
          this.Auctions.find(e=>{
            return e.Auction_Id==res["content"];
          }).hasStarted=true;
          break;
          case "end_auction":
          this.Auctions.find(element=>{
            return element.Auction_Id==res["content"];
          }).hasEnded=true;
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
  startAuction(id:number)
  {
    this.aucadmin.startAuction({"content":id});
  }
  endAuction(id:number)
  {
    this.aucadmin.endAuction({"content":id});
  }
  openBottomSheet(id:number): void {
    this.bottomSheet.open(BottomSheetOverviewExampleSheet,{
      data:{id},
      });
  }

}
@Component({
  selector: 'bottom-sheet-overview-example-sheet',
  template:'passed in {{ data.id}}',
  templateUrl: 'bottom-sheet-overview-example-sheet.html',
})
export class BottomSheetOverviewExampleSheet implements OnDestroy,OnInit{
  constructor(private bottomSheetRef: MatBottomSheetRef<BottomSheetOverviewExampleSheet>,
    private prods:AuctionService,
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: any) {}
  ProductG =[];
  ProductSelect=[{}];
  ngOnInit(){
    
    this.prods.messages.subscribe(res=>
      {
        if(res["type"]="user_products")  
        {
          this.ProductG=res["content"];
        }
      })
      this.prods.getProductsByUserId({"content":JSON.parse(localStorage.currentUser).User_Id});
      // console.log(this.data.id);
  }
  msg=[];
  ngOnDestroy(){
    console.log(this.ProductSelect);
    // this.msg["Auction_Id"]=this.data.id;
    this.ProductSelect.splice(this.ProductSelect.findIndex((element,index,array)=>{
      return (element=={});
    }))
    this.msg["ProdList"]=this.ProductSelect;
    this.ProductSelect.forEach(element => {
      this.msg.push([this.data.id,element["Product_Id"]]);
      
    });
    console.log(this.msg);
    this.prods.addAuctionProducts(this.msg);
  }
  openLink(event: MouseEvent): void {
    this.bottomSheetRef.dismiss();
    event.preventDefault();
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
