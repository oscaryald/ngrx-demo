import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

import { Product } from '../../product';
import { Store, select } from '@ngrx/store';

import * as fromProduct from '../../state';
import * as productActions from '../../state/product.actions';
import { Observable } from 'rxjs';

@Component({
    templateUrl: './product-shell.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductShellComponent implements OnInit {
  displayCode$: Observable<boolean>;
  selectedProduct$: Observable<Product>;
  errorMessage$: Observable<string>;
  products$: Observable<Product[]>;

  constructor(
    private store: Store<fromProduct.State>,
  ) { }

  ngOnInit(): void {
    this.store.dispatch(new productActions.Load());

    this.products$ = this.store.pipe(select(fromProduct.getProducts));
    this.errorMessage$ = this.store.pipe(select(fromProduct.getError));
    this.selectedProduct$ = this.store.pipe(select(fromProduct.getCurrentProduct));
    this.displayCode$ = this.store.pipe(select(fromProduct.getShownProductCode));
  }

  checkChanged(value: boolean): void {
    this.store.dispatch(new productActions.ToggleProductCode(value));
  }

  newProduct(): void {
    this.store.dispatch(new productActions.InitializeCurrentProduct());
  }

  productSelected(product: Product): void {
    this.store.dispatch(new productActions.SetCurrentProduct(product));
  }

  deleteProduct(product): void {
    if (product && product.id) {
      if (confirm(`Really delete the product: ${product.productName}?`)) {
        this.store.dispatch(new productActions.DeleteProduct(product.id));
      }
    }
  }

  saveProduct(product: Product): void {
    if (product.id === 0) {
      this.store.dispatch(new productActions.AddProduct(product));
    } else {
      this.store.dispatch(new productActions.UpdateProduct(product));
    }
  }
}
