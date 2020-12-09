import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { MatStepper } from '@angular/material';
import { AuctionService } from '../services/auction.service';
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
Product_Id;
isLinear = true;
isEditable = false;
User_Id;
Products : FormGroup;
ProductList =[];
  constructor(private FB : FormBuilder, 
              private prodservice : AuctionService) { }

  ngOnInit() {
    this.Products = this.FB.group({
      Product_name : ['',[Validators.required,Validators.minLength(3),Validators.maxLength(16)]],
      Product_description : ['',[Validators.required,Validators.minLength(10),Validators.maxLength(100)]],
      Base_price : ['',[Validators.required,Validators.nullValidator]]
    })
    this.prodservice.messages.subscribe(res=>
      {
        switch (res["type"]) {
          case "register_products":
          this.ProductList.push(res);
          console.log(res);
            break;
          case "user_products":
          console.log(res);
          this.ProductList=res["content"];
          break;
          case "delete_user_products":
            console.log(res);
            this.ProductList.splice(this.ProductList.findIndex((element,index,array)=>{
              return (element.Product_Id==res.content.id);
            }))
            break;
          default:
            break;
        }
      })
      this.prodservice.getProductsByUserId({"content":JSON.parse(localStorage.currentUser).User_Id});
  }
  addProduct(fb: FormGroup)
  {
    if(fb.valid)
    {
      let Prod=fb.value;
      Prod["User_Id"]=JSON.parse(localStorage.currentUser).User_Id;
      this.prodservice.addProducts(Prod);
    }  
  }

  deleteProduct(id:number){
    this.prodservice.deleteProducts({"content":id});
  }



}
