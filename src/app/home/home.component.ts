import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
<nav class="navbar">
  <div>
    <a href="/">Catálogo de productos</a>
  </div>
  <div>
    <a href="/">Home</a>
    <a href="/contact">Contacto</a>
  </div>
  <div>
    <input type="text" placeholder="Buscar productos..." (input)="onSearch($event)">
  </div>
</nav>
<div *ngIf="filteredProducts.length > 0; else noProducts">
  <div class="product-grid"> <!-- Contenedor de cuadrícula -->
    <div *ngFor="let product of filteredProducts" class="card">
      <img [src]="product.image" alt="{{ product.title }}">
      <div class="card-body">
        <h5 class="card-title">{{ product.title }}</h5>
        <p class="card-text">{{ product.description }}</p>
        <button [routerLink]="['/product', product.id]" class="verDetalle">Ver Detalle</button>
      </div>
    </div>
  </div>
</div>
<ng-template #noProducts>
  <p>Cargando todos los productos</p>
</ng-template>
  `,
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  products: any[] = [];
  filteredProducts: any[] = []; 

  constructor(private http: HttpClient, private productService: ProductService, private router: Router) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.productService.getProducts().subscribe(
      data => {
        this.products = data;
        this.filteredProducts = data; // Inicializa filteredProducts con todos los productos
      },
      error => {
        console.error('Error fetching products', error);
      }
    );
  }

  onSearch(event: any): void {
    const searchTerm = event.target.value.toLowerCase();
    this.filteredProducts = this.products.filter(product =>
      product.title.toLowerCase().includes(searchTerm)
    );
  }
}




