import {
  FETCH_PRODUCTS_SUCCESS,
  FETCH_PRODUCT_DETAILS_SUCCESS,
  FETCH_PRODUCTS_FAILURE,
  FETCH_PRODUCT_DETAILS_FAILURE,
} from './actions';

const initialState = {
  products: null,
  productDetails: null,
  error: null,
  loading: false,
  categories: null,
};

const productsReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_PRODUCTS_SUCCESS:
      return {
        ...state,
        loading: false,
        products: action.payload.items, // actualizar los datos con la lista de productos
        categories: action.payload.categories, // añadir las categorías
        error: null
      };
    case FETCH_PRODUCT_DETAILS_SUCCESS:
      return {
        ...state,
        loading: false,
        productDetails: action.payload.item, // guardar el producto seleccionado
        error: null
      };
    case FETCH_PRODUCTS_FAILURE:
    case FETCH_PRODUCT_DETAILS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default productsReducer;
