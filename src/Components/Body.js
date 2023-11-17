import React from 'react';


export default function Body(props) {

  let option = props.options;
  let priceOption = Object.keys(option)

  return (
    <div>
      <div className="card mt-3 " style={{ "maxHeight": "360px", "width": "18rem" }}>
        <img src= {props.imgSrc} alt="..." style={{height:"180px",objectFit:"fill"}}></img>
        <div className="card-body">
          <h5 className="card-title">{props.foodName} </h5>
          <div className='container w-100'>
            <select className='m-2 h-100 text-white font-weight-bold bg-success rounded'>
              {Array.from(Array(9), (e, i) => {
                return (
                  <option key={i + 1} value={i + 1}>{i+1}</option>
                )
              })}
            </select>
            <select className='m-2 h-100 text-white font-weight-bold bg-success rounded'>
              {
                priceOption.map((data)=>{
                  return <option key={data} value={data}>{data}</option>
                })
              }
            </select>
            <div className='d-inline h-100 fs-5'>
              Total Price
            </div>
          </div>
          <hr></hr>
          <button className='btn btn-success justify-center ms-2 '>Add to Cart</button>
        </div>
      </div>
    </div >
  );
}
