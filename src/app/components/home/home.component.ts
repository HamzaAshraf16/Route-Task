import { Component, inject, NgModule, OnInit } from '@angular/core';
import { ProductsService } from '../../shared/services/products.service';
import { IProduct } from '../../shared/interface/iproduct';
import { FormsModule } from '@angular/forms'; 
import { RouterLink } from '@angular/router';
import { CurrencyPipe } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FormsModule,RouterLink,CurrencyPipe,NgxPaginationModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
private _ProductsService=inject(ProductsService)
productList:IProduct[]=[]  
sortedProducts: IProduct[] = [];
searchTerm="";
errorLoading = false;
currentPage: number = 1;
isDarkMode = false;

ngOnInit(): void {
this._ProductsService.getProduct().subscribe({
  next:(response)=>{
    this.productList=response
    this.sortedProducts = [...this.productList]; 

  },
  error:(err)=>{
        console.error('Error loading products:', err);
        this.errorLoading = true;
  }
})
}

  filteredProducts() {
    let products = this.sortedProducts;
    if (this.searchTerm) {
      products = products.filter(product =>
        product.category.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        product.title.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }
    return products;
  }


//* Send Type sorting to this function and sorting Products
  sortProducts(sortType: string) {
    this.sortedProducts = [...this.productList]; 
    if(sortType== 'priceAsc'){
        this.sortedProducts.sort((a,b) => a.price - b.price);        
    }else if(sortType=='priceDesc'){
        this.sortedProducts.sort((a, b) => b.price - a.price);
    }else if(sortType=='nameSort'){
        this.sortedProducts.sort((a, b) => a.category.localeCompare(b.category));
    }else{
       this.sortedProducts = [...this.productList];
    }
      this.currentPage = 1;
  }


toggleDarkMode() {
  this.isDarkMode = !this.isDarkMode;
  if (this.isDarkMode) {
    document.body.classList.add('dark-mode');
  } else {
    document.body.classList.remove('dark-mode');
  }
}
}
