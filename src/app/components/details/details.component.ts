import { Component, inject, OnInit } from '@angular/core';
import { ProductsService } from '../../shared/services/products.service';
import { ActivatedRoute } from '@angular/router';
import { IProduct } from '../../shared/interface/iproduct';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [CurrencyPipe],
  templateUrl: './details.component.html',
  styleUrl: './details.component.css'
})
export class DetailsComponent implements OnInit {
  private _ProductsService=inject(ProductsService)
  private _ActivatedRoute=inject(ActivatedRoute)
  errorLoading=false;
  isDarkMode = false;

  productDetails:IProduct={} as IProduct;

  ngOnInit(): void {
    this._ActivatedRoute.paramMap.subscribe({
      next:(params)=>{
        let idProduct:any=params.get('id');

        this._ProductsService.getProductDetails(idProduct).subscribe({
          next:(response)=>{
            this.productDetails=response;
          },error:(err)=>{
            this.errorLoading=true
          }
        })
  }
    })

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
