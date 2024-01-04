import React from 'react';
import { useCart, useDispatchCart } from '../Components/ContextReducer';
import trash from '../ImagesAndIcons/trash2.1.png'

export default function Cart() {



    let data = useCart();
    let dispatch = useDispatchCart();

    if (data.length === 0) {
        return (
            <div>
                <div className=' text-white mt-5 text-center fs-3'> The Cart is Empty</div>
            </div>
        )
    }

    let totalPrice = data.reduce((total, food) => total + food.finalPrice, 0)



    const handleOrder = async () => {
        alert('Restaurants are not Available!');

        let userEmail = localStorage.getItem('userEmail');
        let responce = await fetch("https://foodplacebackend.onrender.com/api/orderData", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                order_data: data,
                email: userEmail,
                order_date: new Date().toDateString()
            })
        });
        console.log(data)
        console.log(responce.status)
        if (responce.status === 200) {
            dispatch({ type: "DROP" })
        }

    }

    // const userID = localStorage.getItem('userEmail');

    const ClearOrder = async () => {
        await dispatch({ type: "DROP" })
    }
    // table-responsive table-responsive-sm table-responsive-md
    return (
        <div>
            <div className='container table-responsive col-lg-12 mt-5' style={{ overflowX: "scroll", height: "35vh" }}>
                <table className="table table-striped table-responsive table-hover text-center text-capitalize">
                    <thead className='fs-6'>
                        <tr className='table-success table-active text-white'>
                            <th className='' scope='col'>#</th>
                            <th scope='col'>Name</th>
                            <th scope='col'>Quantity</th>
                            <th scope='col'>Options</th>
                            <th scope='col'>Amount</th>
                            <th scope='col'>Dlt</th>
                        </tr>
                    </thead>

                    <tbody>
                        {data.map((food, index) => (
                            <tr>
                                <th scope='row'> {index + 1} </th>
                                <td>{food.name}</td>
                                <td>{food.quantity}</td>
                                <td>{food.size}</td>
                                <td>{food.finalPrice}</td>
                                <td> <img className='' style={{width: "3vh"}} src={trash} alt='Delete' onClick={() => { dispatch({ type: "REMOVE", index: index }) }} /></td>
                            </tr>
                        ))}
                    </tbody>
                </table>

            </div>
            <div>
                <h1 className='fs-2 mx-4 text-white'>Total Price : {totalPrice} /- </h1>

            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <button type="button" className="btn mx-4 btn-danger" onClick={ClearOrder}>Clear All</button>
                <button type="button" className="btn me-4  btn-success" onClick={handleOrder}>Order Now</button>
            </div>
        </div>

    );
}
