import React from 'react';
import { useCart, useDispatchCart } from '../Components/ContextReducer';
import trash from '../ImagesAndIcons/trash1.png'

export default function Cart() {


    let data = useCart();
    let dispatch = useDispatchCart();

    if (data.length === 0) {
        return (
            <div>
                <div className=' text-white m-5 w-100 text-center fs-3'> The Cart is Empty</div>
            </div>
        )
    }

    let totalPrice = data.reduce((total, food) => total + food.finalPrice, 0)


    return (

        <div className=' container m-auto mt-5 table-responsive table-responsive-sm table-responsive-md'>
            <table className="table table-striped">
                <thead className='text-success fs-4'>
                    <tr>
                        <th scope='col'>#</th>
                        <th scope='col'>Name</th>
                        <th style={{ textAlign: 'center' }} scope='col'>Quantity</th>
                        <th style={{ textAlign: 'center' }} scope='col'>Options</th>
                        <th style={{ textAlign: 'center' }} scope='col'>Amount</th>
                        <th scope='col'></th>
                    </tr>
                </thead>

                <tbody>
                    {data.map((food, index) => (
                        <tr>
                            <th scope='row'> {index + 1} </th>
                            <td>{food.name}</td>
                            <td style={{ textAlign: 'center' }}>{food.quantity}</td>
                            <td style={{ textAlign: 'center' }}>{food.size}</td>
                            <td style={{ textAlign: 'center' }}>{food.finalPrice}</td>
                            <td><button type='button' className='btn p-0 m-0' style={{ 'height': '30px', 'display': 'flex', "justifyContent": 'end' }}><img src={trash} alt='Delete' onClick={() => { dispatch({ type: "REMOVE", index: index }) }} /></button></td>

                        </tr>
                    ))}
                </tbody>
            </table>
            <div>
                <h1 className='fs-2 text-white'>Total Price : {totalPrice} /- </h1>
                
            </div>
            <button type="button" className="btn btn-success">Order!</button>
        </div>

    );
}
