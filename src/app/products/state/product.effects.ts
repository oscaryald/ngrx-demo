import { Action } from '@ngrx/store';
import { ProductService } from './../product.service';
import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';

import * as productActions from './product.actions';
import { mergeMap, map, catchError } from 'rxjs/operators';
import { Product } from '../product';
import { of, Observable } from 'rxjs';

@Injectable()
export class ProductEffects {

    constructor(
        private actions$: Actions,
        private productService: ProductService,
    ) {}

    @Effect()
    loadProducts$: Observable<Action> = this.actions$.pipe(
        ofType(productActions.ProductActionTypes.Load),
        mergeMap((actions: productActions.Load) =>
            this.productService.getProducts().pipe(
                map((products: Product[]) => (new productActions.LoadSuccess(products))),
                catchError(err => of(new productActions.LoadFail(err)))
            )
        )
    );

    @Effect()
    updateProduct$: Observable<Action> = this.actions$.pipe(
        ofType(productActions.ProductActionTypes.UpdateProduct),
        map((action: productActions.UpdateProduct) => action.payload),
        mergeMap((product: Product) =>
            this.productService.updateProduct(product).pipe(
                map(updateProduct => (new productActions.UpdateProductSuccess(updateProduct))),
                catchError(err => of(new productActions.UpdateProductFail(err)))
            )
        )
    );

    @Effect()
    deleteProduct$: Observable<Action> = this.actions$.pipe(
        ofType(productActions.ProductActionTypes.DeleteProduct),
        map((action: productActions.DeleteProduct) => action.payload),
        mergeMap((id: number) => {
            return this.productService.deleteProduct(id).pipe(
                map(() => (new productActions.DeleteProductSuccess(id))),
                catchError(err => of(new productActions.DeleteProductFail(err)))
                );
            }
        )
    );

    @Effect()
    addProduct$: Observable<Action> = this.actions$.pipe(
        ofType(productActions.ProductActionTypes.AddProduct),
        map((action: productActions.AddProduct) => action.payload),
        mergeMap((product: Product) => {
            return this.productService.createProduct(product).pipe(
                map((newProduct: Product) => (new productActions.AddProductSuccess(newProduct))),
                catchError(err => of(new productActions.AddProductFail(err)))
                );
            }
        )
    );
}
