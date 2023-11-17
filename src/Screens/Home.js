import React, { useEffect, useState } from 'react';
import NavBar from '../Components/NavBar';
import Body from '../Components/Body';
import Footer from '../Components/Footer';
// import Carousal from '../Components/Carousal';

export default function Home() {

  const [search, setsearch] = useState('');
  const [foodCat, setfoodCat] = useState([]);
  const [foodItem, setfoodItem] = useState([]);

  const loadData = async () => {
    let response = await fetch("http://13.228.225.19:5000/api/foodData", {
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





  return (
    <>
      <div><NavBar /></div>
      <div>
        <div>
          <div id="carouselExampleFade" className="carousel slide carousel-fade" data-bs-ride="carousel" style={{ objectFit: "contain" }}>
            <div className="carousel-inner" id='carusal' style={{ maxHeight: "500px", }}>
              {/* Search Bar properties */}
              <div className='carousel-caption d-none d-md-block' style={{ zIndex: "10" }}>
                <div className="d-flex justify-content-center">
                  <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" value={search} onChange={(e) => { setsearch(e.target.value) }} />
                  {/* <span className='clear'>x</span> */}
                  {/* <button className="btn btn-outline-success  bg-secondary text-white" type="submit">x</button> */}
                </div>
              </div>

              {/* Carousel images */}
              <div className="carousel-item active">
                <img src="https://source.unsplash.com/random/900x700/?Pizza" className="d-block w-100" style={{ filter: "brightness(30%)" }} alt='...' />
              </div>
              <div className="carousel-item">
                <img src="https://source.unsplash.com/random/900x700/?Burger" className="d-block w-100" style={{ filter: "brightness(30%)" }} alt='...' />
              </div>
              <div className="carousel-item">
                <img src="https://source.unsplash.com/random/900x700/?soup" className="d-block w-100" style={{ filter: "brightness(30%)" }} alt='...' />
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
          foodCat !== []
            ? foodCat.map((data, pos) => {
              return (<div className='row mb-3' key={pos}>
                <div key={data._id} className='fs-3 m-3'>
                  {data.CategoryName}
                </div>
                <hr />
                {
                  foodItem !== []
                    ? foodItem.filter((item) => item.CategoryName === data.CategoryName && item.name.toLowerCase().includes(search.toLowerCase()))
                      .map(filterItems => {
                        return (
                          <div key={filterItems._id} className='col-12 col-md-6 col-xl-3'>
                            <Body foodName={filterItems.name}
                              options={filterItems.options[0]}
                              imgSrc={filterItems.img}></Body>
                          </div>
                        )
                      })
                    : <div>Error: No Such Data Found</div>
                }
              </div>)
            })
            : ""
        }
      </div>
      <div><Footer /></div>
    </>
  );
};

