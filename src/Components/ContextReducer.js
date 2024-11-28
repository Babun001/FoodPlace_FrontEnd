import React, { createContext, useContext, useReducer } from 'react';

const CartStateContext = createContext();
const CartDispatchContext = createContext();

const reducer = (state, action) => {
    switch (action.type) {
        case "ADD":
            return [...state,
            { id: action.id, name: action.name, quantity: action.quantity, size: action.size, finalPrice: action.finalPrice, img: action.img , description: action.description }]
        case "REMOVE":
            let newArr = [...state]
            newArr.splice(action.index, 1)
            return newArr
        // case "UPDATE":

        //     let Arr = [...state]
        //     Arr.find((food, index) => {
        //         if (food.id === action.id && food.size === action.size) {
        //             console.log(food.quantity, parseInt(action.quantity), action.finalPrice + food.finalPrice)

        //             Arr[index] = { ...food, quantity: parseInt(food.quantity) + parseInt(action.quantity), finalPrice: action.finalPrice + food.finalPrice }
        //         }
        //         return Arr
        //     })
        //     return Arr

        case "DROP":
            let Emptyarr = []
            return Emptyarr
        default:
            console.log("error in ContextReducer.js");
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
