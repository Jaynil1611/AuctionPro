import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { MatStepper } from '@angular/material';
import { ProductService } from '../services/product.service';
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
              private prodservice : ProductService) { }

  ngOnInit() {
    this.Products = this.FB.group({
      Product_name : ['',Validators.required],
      Product_description : ['',Validators.required],
      Base_price : ['',Validators.required]
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
          default:
            break;
        }
      })
      this.prodservice.getUserProducts({"content":JSON.parse(localStorage.currentUser).User_Id});
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



}
