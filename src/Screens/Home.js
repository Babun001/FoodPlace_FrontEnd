import React, { useEffect, useState } from 'react';
import NavBar from '../Components/NavBar';
import Body from '../Components/Body';
import Footer from '../Components/Footer';
// import { useNavigate } from 'react-router-dom';
// import CartLogo from '../ImagesAndIcons/icon.jpg'
// import Carousal from '../Components/Carousal';

import img1 from '../ImagesAndIcons/img1.jpg'
import img2 from '../ImagesAndIcons/img2.jpg'
import img3 from '../ImagesAndIcons/img3.jpg'

export default function Home() {

  const [search, setsearch] = useState('');
  const [foodCat, setfoodCat] = useState([]);
  const [foodItem, setfoodItem] = useState([]);

  // let navigate = useNavigate()

  const loadData = async () => {
    let response = await fetch("https://foodplacebackend.onrender.com/api/foodData", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      }
    });

    response = await response.json();

    // console.log(response[0],response[1]);
    setfoodItem(response[0]);
    setfoodCat(response[1]);

  }


  useEffect(() => {
    loadData()
  }, [])

  // const ClearField = () => {
  //   document.getElementById('input').value=''
  //   // navigate("/")
  // }


  return (
    <>
      <div><NavBar /></div>
      <div>
        <div>
          <div id="carouselExampleFade" className="carousel slide carousel-fade" data-bs-ride="carousel" style={{ objectFit: "contain" }}>
            <div className="carousel-inner" id='carusal' style={{ maxHeight: "500px", }}>
              {/* Search Bar properties */}
              <div className='carousel-caption' style={{ zIndex: "10" }}>
                <div className="d-flex justify-content-center">
                  <input  id='input' className="form-control me-2" type="search" placeholder="Search" aria-label="Search" value={search} onChange={(e) => { setsearch(e.target.value) }} />
                  {/* <button className="btn border-white rounded bg-none text-dark" type="submit" onClick={ClearField}>X</button>
                  <i class="bi bi-search"></i> */}
                </div>
              </div>

              {/* Carousel images */}
              <div className="carousel-item active">
                <img src={img1} className="d-block w-100" style={{ filter: "brightness(30%)" }} alt='carouselImage' />
              </div>
              <div className="carousel-item">
                <img src={img2} className="d-block w-100" style={{ filter: "brightness(30%)" }} alt='carouselImage' />
              </div>
              <div className="carousel-item">
                <img src={img3} className="d-block w-100" style={{ filter: "brightness(30%)" }} alt='carouselImage' />
              </div>
            </div>
            <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
              <span className="carousel-control-prev-icon" aria-hidden="true"></span>
              <span className="visually-hidden">Previous</span>
            </button>
            <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
              <span className="carousel-control-next-icon" aria-hidden="true"></span>
              <span className="visually-hidden">Next</span>
            </button>
          </div>
        </div>
      </div>
      <div className='container text-white '>
        {
          foodCat && foodCat.map((data, pos) => {
            return (<div className='row mx-2 ' key={pos}>
              <div key={data._id} className=' fs-3 m-3'>
                {data.CategoryName}
              </div>
              <hr />
              {
                foodItem && foodItem.filter((item) => item.CategoryName === data.CategoryName && item.name.toLowerCase().includes(search.toLowerCase()))
                  .map(filterItems => {
                    return (
                      <div key={filterItems._id} className='d-flex justify-content-center col-12 col-md-6 col-xl-3'>
                        <Body foodItem={filterItems}
                          options={filterItems.options[0]}
                          imgSrc={filterItems.img}></Body>
                      </div>
                    )
                  })
              }
            </div>)
          })
        }
      </div>
      <div><Footer /></div>
    </>
  );
};

