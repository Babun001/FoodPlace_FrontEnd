import React, { useEffect, useRef, useState } from 'react';
import { useCart, useDispatchCart } from './ContextReducer';
// import Description from './Description';


export default function Body(props) {

  // let dta = useCart();
  let dispatch = useDispatchCart();
  let option = props.options;
  let priceOption = Object.keys(option);

  let data = useCart()

  let priceRef = useRef();
  // let descriptionRef = useRef();

  const [quantity, setquantity] = useState(1);
  const [size, setsize] = useState("");
  const [description, setDescription] = useState('');

  let finalPrice = quantity * parseInt(option[size]);
  useEffect(() => {
    setsize(priceRef.current.value);
  }, []);

  const handleAddToCart = async () => {
    let food = [];
    for (const item of data) {
      if (item.id === props.foodItem._id) {
        food = item;
        break;
      }
    }
    // if (food !== []) {
    //   if (food.size === size) {
    //     await dispatch({ type: "UPDATE", id: props.foodItem._id, name: props.foodItem.name, finalPrice: finalPrice, quantity: quantity });
    //     return
    //   }
    //   else if (food.size !== size) {
    //     await dispatch({ type: "ADD", id: props.foodItem._id, name: props.foodItem.name, finalPrice: finalPrice, quantity: quantity, size: size });
    //     return
    //   }      
    // };
    await dispatch({ type: "ADD", id: props.foodItem._id, name: props.foodItem.name, finalPrice: finalPrice, quantity: quantity, size: size, description: description });
  };

  // const handleDescription = () => {
  //   // alert(props.foodItem.description);
  //   if(props.foodItem){
  //     setDescription(props.foodItem.name);
  //     console.log(description)
  //   }else{
  //     alert(`description not reached!`);
  //   }

  // }

  const handleDescription = () =>{
    if(props.foodItem.description){
      setDescription(props.foodItem.description);
      console.log(props.foodItem.description);
    }else{
      console.log(`Description not available!`)
    }
  }






  return (
    <div>
      <div id='card' className="card mt-3" style={{ display: "flex", "maxHeight": "360px", "width": "18rem" }}>
        <img src={props.foodItem.img} alt="..." style={{ height: "180px", objectFit: "fill" }}></img>
        <div className="card-body ">
          <h4 className="card-title">{props.foodItem.name} </h4>
          <div id='options' className='container w-100'>
            <select id='quentity' className='quentity m-2 h-100 text-white font-weight-bold bg-dark rounded' onChange={(e) => setquantity(e.target.value)}>
              {Array.from(Array(9), (e, i) => {
                return (
                  <option key={i + 1} value={i + 1}>{i + 1}</option>
                )
              })}
            </select>


            <select className='quentity m-2 h-100 text-white font-weight-bold bg-dark rounded' ref={priceRef} onChange={(e) => setsize(e.target.value)}>
              {
                priceOption.map((data) => {
                  return <option key={data} value={data}>{data}</option>
                })
              }
            </select>


            <div className='d-inline h-100 fs-5 ms-2'>
              ₹ {finalPrice}
            </div>
          </div>
          <hr></hr>
          {
            (localStorage.getItem("authToken"))
              ? <div id='buttons'>
                <button id='AddtoCart' className='btn btn-dark justify-center  ' onClick={handleAddToCart} >Add to Cart</button>
                <button id='Description' className='btn btn-dark justify-center' onClick={handleDescription}>Description</button>
              </div>
              : <div id='buttons'>
                <button id='AddtoCart' className='btn btn-dark justify-center' onClick={handleAddToCart} disabled>Add to Cart</button>
                <button id='Description' className='btn btn-dark justify-center' onClick={handleDescription} disabled>Description</button>
              </div>
          }
          {/* <div>
            <button className='btn btn-dark justify-center ms-2 ' onClick={handleAddToCart} >Add to Cart</button>
            <button className='btn btn-dark justify-center ms-4' onClick={handleDescription}>Description</button>
          </div> */}
        </div>
      </div>
    </div >
  );
}
