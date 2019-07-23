import { Product } from '../product';
import { ProductActions, ProductActionTypes } from './product.actions';

export interface ProductState {
    showProductCode: boolean;
    products: Product[];
    currentProductId: number | null;
    error: string;
}

const initialState: ProductState = {
    showProductCode: true,
    products: [],
    currentProductId: null,
    error: '',
};

export function reducer(state = initialState, action: ProductActions): ProductState {
    switch (action.type) {
        case ProductActionTypes.ToggleProductCode:
            return {
                ...state,
                showProductCode: action.payload,
            };
        case ProductActionTypes.SetCurrentProduct:
            return {
                ...state,
                currentProductId: action.payload.id,
            };
        case ProductActionTypes.ClearCurrentProduct:
            return {
                ...state,
                currentProductId: null,
            };
        case ProductActionTypes.InitializeCurrentProduct:
            return {
                ...state,
                currentProductId: 0,
            };
        case ProductActionTypes.LoadSuccess:
            return {
                ...state,
                products: action.payload,
                error: '',
            };
        case ProductActionTypes.LoadFail:
            return {
                ...state,
                products: [],
                error: action.payload
            };
        case ProductActionTypes.UpdateProductSuccess:
            const updateProducts = state.products.map(
                item => action.payload.id === item.id ? action.payload : item);
            return {
                ...state,
                products: updateProducts,
                currentProductId: action.payload.id,
                error: ''
            };
        case ProductActionTypes.DeleteProductSuccess:
            return {
                ...state,
                products: state.products.filter(item => action.payload !== item.id),
                currentProductId: null,
                error: ''
            };
        case ProductActionTypes.AddProductSuccess:
                return {
                    ...state,
                    products: [...state.products, action.payload],
                    currentProductId: action.payload.id,
                    error: ''
                };
        default:
            return state;
    }
}
