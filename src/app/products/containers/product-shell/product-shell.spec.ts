import { State } from './../../../state/app.state';
import { MockStore } from './../../state/mock-store';
import { Store } from '@ngrx/store';
/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';
import { ProductShellComponent } from './product-shell.component';
import { of } from 'rxjs';
import * as fromProduct from '../../state';
import { pluck } from 'rxjs/operators';
import * as productActions from '../../state/product.actions';

describe('ProductShellComponent', () => {
  let component: ProductShellComponent;
  let fixture: ComponentFixture<ProductShellComponent>;
  let store: MockStore<fromProduct.State>;
  let dispatchSpy;

  let mockStoreData = {
    products: {
      showProductCode: false,
      currentProductId: 1,
      error: '',
      products: [],
    },
    user: {
      showUserMask: false,
      currentUser: {
        id: 1,
        userName: '',
        isAdmin: false,
      }
    }
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductShellComponent ],
      providers: [
        {
            provide: Store,
            useClass: MockStore,
        },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductShellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  beforeEach(inject([Store], (mockStore: MockStore<fromProduct.State>) => {
    store = mockStore;                            // save store reference for use in tests
    store.setState(mockStoreData); // set default state
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get products', () => {
    let resultProducts = [];

    store.setState({
      ...mockStoreData,
      products: {
        ...mockStoreData.products,
        products: [{
          id: 1,
          productName: 'Product 1',
          productCode: '12345',
          description: 'Some descr',
          starRating: 5,
        }],
      },
    });

    fixture.detectChanges();
    component.products$.subscribe((mockStore) => {
      resultProducts = mockStore['products'].products;
    });
    expect(resultProducts.length).toBe(1);
  });

  it('should toggle product code after checkChanged', () => {
    dispatchSpy = spyOn(store, 'dispatch');
    const value = true;

    component.checkChanged(value);
    expect(dispatchSpy).toHaveBeenCalledWith(
      new productActions.ToggleProductCode(value)
    );
  });
});
