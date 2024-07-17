import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule],  // Importa CommonModule para utilizar las directivas *ngIf
  template: `
      <h1>Producto</h1>
          <div *ngIf="product" class="product-detail-container">
            <div class="product-header">
              <h2>{{ product.title }}</h2>
            </div>
            <div class="product-content">
              <img [src]="product.image" alt="{{ product.title }}">
              <p class="text-detail">{{ product.description }}</p>
            </div>
            <button (click)="goBack()">Volver al inicio</button>
          </div>

  `,
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  product: any;

  constructor(private route: ActivatedRoute, private productService: ProductService) {}
  goBack(){
    window.history.back(); 
  }
  ngOnInit(): void {
    const productId = this.route.snapshot.paramMap.get('id');
    if (productId) {
      this.productService.getProductById(productId).subscribe((data) => {
        this.product = data;
      });
    }
  }
}




