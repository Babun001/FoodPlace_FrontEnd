import React, { useEffect, useRef, useState } from 'react';
import { useDispatchCart, useCart } from './ContextReducer';




export default function Body(props) {

  let dta = useCart();
  let dispatch = useDispatchCart();
  let option = props.options;
  let priceOption = Object.keys(option);

  let priceRef = useRef();

  const [quantity, setquantity] = useState(1);
  const [size, setsize] = useState("half");

  const handleAddToCart = async () => {
    await dispatch({ type: "ADD", id: props.foodItem._id, name: props.foodItem.name, price: props.finalPrice, quantity: quantity, size: size });
    console.log(dta);
  };

  const handleDescription = ()=>{
    console.log(`clicked on description!`);
    
  };

  let finalPrice = quantity * parseInt(option[size]);
  useEffect(() => {
    setsize(priceRef.current.value);
  }, []);


  return (
    <div>
      <div className="card mt-3 " style={{ "maxHeight": "360px", "width": "18rem" }}>
        <img src={props.foodItem.img} alt="..." style={{ height: "180px", objectFit: "fill" }}></img>
        <div className="card-body">
          <h5 className="card-title">{props.foodItem.name} </h5>
          <div className='container w-100'>
            <select className='m-2 h-100 text-white font-weight-bold bg-success rounded' onChange={(e) => setquantity(e.target.value)}>
              {Array.from(Array(9), (e, i) => {
                return (
                  <option key={i + 1} value={i + 1}>{i + 1}</option>
                )
              })}
            </select>


            <select className='m-2 h-100 text-white font-weight-bold bg-success rounded' ref={priceRef} onChange={(e) => setsize(e.target.value)}>
              {
                priceOption.map((data) => {
                  return <option key={data} value={data}>{data}</option>
                })
              }
            </select>


            <div className='d-inline h-100 fs-5 '>
              ₹ {finalPrice}
            </div>
          </div>
          <hr></hr>
          <div>
            <button className='btn btn-success justify-center ms-2 ' onClick={handleAddToCart}>Add to Cart</button>
            <button className='btn btn-success justify-center ms-4 ' onClick={handleDescription}>Description</button>            
          </div>
        </div>
      </div>
    </div >
  );
}
