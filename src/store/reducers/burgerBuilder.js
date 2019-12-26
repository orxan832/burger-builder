import * as actionTypes from '../actions/actionTypes';

const initialState = {
    ingredients: null,
    totalPrice: 4,
    error: false,
    building: false
}

const INGREDIENT_PRICES = {
    salad: 0.5,
    chicken: 0.7,
    cheese: 0.4,
    meat: 1.3
  }

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADD_INGREDIENTS:
            return {
                ...state, //Once statei immutable etmek ucun onun kopyasini gotururuk.
                ingredients: {
                    ...state.ingredients, //tek statein kopyasini goturmek bes etmediyi ucun derin kopya etmeliyik. cunki ingredients de json oldugu ucun onun icinde de datalar var ve bu datalarin kopyasini ...state ile ala bilmirik(deep copy).
                    [action.ingredientName]: state.ingredients[action.ingredientName] + 1 //[action.ingredientName] bu sintaksis array ucun yox dinamik sekilde ad vermek ucun istifade olunur
                },
                totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName],
                building: true
            }
        case actionTypes.REMOVE_INGREDIENTS:
            return {
                ...state, //Once statei immutable etmek ucun onun kopyasini gotururuk.
                ingredients: {
                    ...state.ingredients, 
                    [action.ingredientName]: state.ingredients[action.ingredientName] - 1 
                },
                totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientName],
                building: true
            }
        case actionTypes.SET_INGREDIENTS:
            return {
                ...state,
                ingredients: {
                    cheese: action.ingredients.cheese,
                    chicken: action.ingredients.chicken,
                    meat: action.ingredients.meat,
                    salad: action.ingredients.salad 
                },
                totalPrice: 4,
                error: false,
                building: false
            }
        case actionTypes.FETCH_INGREDIENTS_FAILED:
            return {
                ...state,
                error: true
            }
        default:
            return state;
    }
}

export default reducer;