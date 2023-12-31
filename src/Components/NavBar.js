import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import CartLogo from '../ImagesAndIcons/icon.jpg'
import Model from '../Model';
import Cart from '../Screens/Cart';
import { useCart } from './ContextReducer';

export default function NavBar() {
    let data = useCart();
    const [cartView,setcartView] = useState(false)
    const navigate = useNavigate();
    const handleLogout = () => {
        localStorage.removeItem("authToken");
        navigate("/Login");
    };
    // const handleToCart =() =>{
    //     navigate("/cart");
    // };


    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container-fluid">
                    <div className="navbar-brand fs-1 fst-italic">
                        FoodPlace
                    </div>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto ">
                            {
                                (localStorage.getItem("authToken"))
                                    ? <li>
                                        <Link className='nav-link active fs-5 ' aria-current='page' to={""}>My Orders</Link>
                                    </li>
                                    : ""
                            }
                            <div className='navbar-nav me-auto'>
                                {
                                    (localStorage.getItem("authToken"))
                                        ? <select className="form-select bg-dark text-white mx-3 form-select-sm fs-5" style={{ width: "250px", height: "35px", border: "none", margin: "4px" }} aria-label="Disabled select example">
                                            <option defaultValue>Select Restaurant</option>
                                            <option value="1">Restaurant Nisha</option>
                                            <option value="2">Haji Biryani</option>
                                            <option value="3">Kushari Restaurant</option>
                                            <option value="4">Wifi</option>
                                            <option value="6">Bypass Dhaba</option>
                                            <option value="5">Pach Foron</option>
                                            <option value="7">Bombay Cafe</option>
                                            <option value="8">Pool Side Restaurant</option>
                                            <option value="9">Cha Khor</option>
                                            <option value="10">Sampriti</option>                                      
                                            
                                        </select>
                                        : ""

                                }
                            </div>
                        </ul>
                        {
                            (!localStorage.getItem("authToken"))
                                ? <div className='d-flex' style={{ margin: "0px 80px" }}>
                                    <Link className="nav-link text-white mx-1 opacity-75 fs-5" to="/Login">Log In</Link>
                                    <span className=' text-white mx-2 opacity-75 user-select-none fs-5' >/</span>
                                    <Link className="nav-link text-white mx-2 opacity-75 fs-5" to="/Signup">Sign Up</Link>
                                </div>
                                :
                                <div className='d-flex' style={{ margin: "0px 80px" }}>
                                    <button className="btn border-0 text-white  mx-5 fs-5 position-relative" onClick={()=>setcartView(true)}><img style={{ width: 30, height: 30 }} src={CartLogo} alt="X" />
                                        <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-success fs-8">
                                            {data.length}
                                            {/* <span className="visually-hidden">unread messages</span> */}
                                        </span>
                                    </button>

                                    
                                    {cartView? <Model onClose={()=> setcartView(false)}><Cart /></Model>:null}


                                    <Link className="btn text-white bg-danger mx-2" disabled style={{ width: "80px", height: "30px", fontSize: "15px", margin: "9px", padding: "2px" }} onClick={handleLogout}>Log Out</Link>
                                </div>
                        }


                    </div>
                </div>
            </nav>
        </div>
    );
}
