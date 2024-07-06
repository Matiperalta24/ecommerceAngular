import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule],  // Importa CommonModule y RouterModule
  template: `
<nav class="navbar">
  <div class="navbar-brand">
    <a href="/">Mi Tienda</a>
  </div>
  <div class="navbar-links">
    <a href="/">Home</a>
    <a href="/contact">Contacto</a>
  </div>
  <div class="navbar-search">
    <input type="text" placeholder="Buscar productos..." (input)="onSearch($event)">
  </div>
</nav>
    <div *ngIf="products.length > 0; else noProducts">
      <div *ngFor="let product of products" class="card">
        <img [src]="product.image" alt="{{product.title}}">
        <div class="card-body">
          <h5 class="card-title">{{product.title}}</h5>
          <p class="card-text">{{product.description}}</p>
          <a [routerLink]="['/product', product.id]" class="verDetalle">Ver Detalle</a>
        </div>
      </div>
    </div>
    <ng-template #noProducts>
      <p>Cargando...</p>
    </ng-template>
  `,
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  products: any[] = [];
  filteredProducts: any[] = []; 
  constructor(private http: HttpClient, private productService: ProductService, private router: Router) {}

  ngOnInit(): void {
    this.http.get<any[]>('https://fakestoreapi.com/products').subscribe(
      data => {
        this.products = data;
      },
      error => {
        console.error('Error fetching products', error);
      }
    );
    this.productService.getProducts().subscribe((data: any[]) =>{
      this.products = data;
      this.filteredProducts = data; 
    })
  }
  onSearch(event: any) {
    const searchTerm = event.target.value.toLowerCase();
    this.filteredProducts = this.products.filter(product =>
      product.name.toLowerCase().includes(searchTerm)
    );
  }
  
  filterProducts(event: Event): void {
    const query = (event.target as HTMLInputElement).value.toLowerCase();
    this.filteredProducts = this.products.filter(product => product.title.toLowerCase().includes(query));
  }

  navigateToContact(): void {
    this.router.navigate(['/contact']);
  }

  viewProductDetail(productId: number): void {
    this.router.navigate(['/product', productId]);
  }
}



