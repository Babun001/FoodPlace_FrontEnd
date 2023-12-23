import React, { createContext, useContext, useReducer } from 'react';

const CartStateContext = createContext();
const CartDispatchContext = createContext();

const reducer = (state, action) => {
    switch (action.type) {
        case "ADD":
            return [...state,
            { id: action.id, name: action.name, quantity: action.quantity, size: action.size, finalPrice: action.finalPrice, img: action.img }]
        case "REMOVE":
            let newArr = [...state]
            newArr.splice(action.index, 1)
            return newArr
        case 'UPDATE':
                let arr = [...state]
                arr.find((food,index) => {
                    if (food.id === action.id){
                        console.log(food.quantity, parseInt(action.quantity), action.finalPrice + food.finalPrice)
                        arr[index] = {...food, quantity: action.quantity + food.quantity, finalPrice: action.finalPrice + food.finalPrice}
                    }
                    return arr
                })
                return arr
                
        default:
            console.log("error in ContextReducer");
    }
}

export const CartProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, [])
    return (
        <CartDispatchContext.Provider value={dispatch}>
            <CartStateContext.Provider value={state}>
                {children}
            </CartStateContext.Provider>
        </CartDispatchContext.Provider>
    )
}

export const useCart = () => useContext(CartStateContext);
export const useDispatchCart = () => useContext(CartDispatchContext);
