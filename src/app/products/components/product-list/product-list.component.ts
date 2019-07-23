import { Product } from './../../product';

import { Component, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'pm-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent {
  pageTitle = 'Products';

  @Input() displayCode: boolean;
  @Input() errorMessage: string;
  @Input() products: Product;
  @Input() selectedProduct: Product[];

  @Output() checked = new EventEmitter<boolean>();
  @Output() initializedNewProduct = new EventEmitter<void>();
  @Output() selected = new EventEmitter<Product>();

  checkChanged(value: boolean): void {
    this.checked.emit(value);
  }

  newProduct(): void {
    this.initializedNewProduct.emit();
  }

  productSelected(product: Product): void {
    this.selected.emit(product);
  }

}
