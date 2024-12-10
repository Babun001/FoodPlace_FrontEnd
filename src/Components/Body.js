import React, { useEffect, useRef, useState } from 'react';
import { useCart, useDispatchCart } from './ContextReducer';
import { Link, useNavigate } from 'react-router-dom';
import Description from './Description';

export default function Body(props) {

  let dispatch = useDispatchCart();
  let option = props.options;
  let priceOption = Object.keys(option);

  const navigate = useNavigate();

  let data = useCart()

  let priceRef = useRef();

  const [quantity, setquantity] = useState(1);
  const [size, setsize] = useState("");


  let finalPrice = quantity * parseInt(option[size]);
  useEffect(() => {
    if (priceRef.current) {
      setsize(priceRef.current.value);
    } else {
      console.log("Error in useEffect in priceRef");

    }
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

  const [clickedDescription, setClickedDescription] = useState(true);
  const [description, setDescription] = useState('');

  const handleDescription = () => {
    if (props.foodItem.description) {
      if (clickedDescription) {
        setClickedDescription(false);
      }
      setDescription(props.foodItem.description);
    }
  }
  const handleBackDecs = () => {
    setClickedDescription(true);
  }


  return (
    <div>
      {
        (clickedDescription)
          ? <div id='card' className="card mt-3" style={{ display: "flex", "maxHeight": "360px", "width": "18rem" }}>
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
                    <button id='AddtoCart' className='btn btn-dark justify-center  ' onClick={handleAddToCart}  >Add to Cart</button>
                    <button id='Description' className='btn btn-dark justify-center' onClick={handleDescription} >Description</button>
                  </div>
                  : <div id='buttons'>
                    <button id='AddtoCart' className='btn btn-dark justify-center' onClick={handleAddToCart} disabled>Add to Cart</button>
                    <button id='Description' className='btn btn-dark justify-center' disabled>Description</button>
                  </div>
              }
            </div>
          </div>
          : <div id='card' className="card mt-3" style={{ display: "flex", "maxHeight": "360px", "width": "18rem" }}>
            <img src={props.foodItem.img} alt="..." style={{ height: "180px", objectFit: "fill" }}></img>
            <div className="card-body ">
              <h4 className="card-title">{props.foodItem.name} </h4>
              <div id='options' className='container w-100'></div>
              <div className="backDescription" style={{
                display: "flex",
                justifyContent: "space-between"
              }}>
                <h6 id='descId'>Description:</h6>
                <button id='backDesc' style={{
                  backgroundColor:"#D32F2F",
                  borderRadius:"5px",
                  fontSize:"15px",
                  fontWeight:"700",
                  // color:"whitesmoke"
                }}
                  onClick={handleBackDecs}>X</button>
              </div>

              <p id='descriptionPara' style={{
                display: "block",
                overflow: "hidden"
              }}>{props.foodItem.description}</p>
            </div>
          </div>
      }
    </div >
  );
}
