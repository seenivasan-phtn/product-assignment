import {
    GET_PRODUCTS,
    GET_PRODUCTS_FAILURE,
    GET_PRODUCTS_SUCCESS,
    SEARCH_PRODUCTS
} from "../actionTypes/product";

export default (prevState = {
    products: [],
    product: {},
    isLoading: false,
    isRefreshing: false,
    page: 1,
    limit: 8
}, action) => {
    console.log(action.type);
    switch (action.type) {
        case GET_PRODUCTS:
            return { ...prevState,
                isLoading: prevState.products.length > 0 ? false:true,
                page: action.page
            }
        case GET_PRODUCTS_SUCCESS:
            return { ...prevState,
                isLoading: false,
                products: prevState.products.concat(action.products)
            }        
        case GET_PRODUCTS_FAILURE:
            return { ...prevState,
                isLoading: false,
                error: action.error
            }
        case SEARCH_PRODUCTS:
            console.log("reducer: "+action.items);
            return { ...prevState,
                isLoading: false,
                filterProducts: 
                action.items.length > 0 ?
                    action.products
                    :action.products
            }   
        default:
            return prevState;

    }
}