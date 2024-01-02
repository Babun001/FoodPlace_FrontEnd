import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import CartLogo from '../ImagesAndIcons/icon.jpg'
import Model from '../Model';
import Cart from '../Screens/Cart';
import { useCart } from './ContextReducer';

export default function NavBar() {
    let data = useCart();
    const [cartView, setcartView] = useState(false)
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
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="true" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto ">
                            {
                                (localStorage.getItem("authToken"))
                                    ? <li>
                                        <Link className='nav-link active fs-5 mx-3' aria-current='page' to={""} disabled>My Orders</Link>
                                    </li>
                                    : ""
                            }
                            <div className='navbar-nav me-auto'>
                                {
                                    (localStorage.getItem("authToken"))
                                        ? <select className="form-select bg-dark text-start mx-2  text-white  form-select-sm fs-5" style={{ width: "200px", height: "", border: "none", margin: "4px" }} aria-label="Disabled select example">
                                            <option defaultValue>Select Restaurant</option>
                                            <option value="1" disabled>Restaurant Nisha</option>
                                            <option value="2" disabled>Haji Biryani</option>
                                            <option value="3" disabled>Kushari Restaurant</option>
                                            <option value="4" disabled>Wifi</option>
                                            <option value="6" disabled>Bypass Dhaba</option>
                                            <option value="5" disabled>Pach Foron</option>
                                            <option value="7" disabled>Bombay Cafe</option>
                                            <option value="8" disabled>Pool Side Restaurant</option>
                                            <option value="9" disabled>Cha Khor</option>
                                            <option value="10" disabled>Sampriti</option>

                                        </select>
                                        : ""

                                }
                            </div>
                            <div className='mx-2'>
                                <Link className='btn text-white fs-5' to='/about'>AboutMe</Link>
                            </div>
                            <div className='mx-2'>
                                <Link className='btn text-white fs-5' to='/connectMe '>Contacts</Link>
                            </div>

                        </ul>
                        {
                            (!localStorage.getItem("authToken"))
                                ? <div className='d-flex mt-3 mb-4'>
                                    <Link className="nav-link text-white mx-1 opacity-75 fs-5" to="/Login">Log In</Link>
                                    <span className=' text-white mx-2 opacity-75 user-select-none fs-5' >/</span>
                                    <Link className="nav-link text-white mx-2 opacity-75 fs-5" to="/Signup">Sign Up</Link>
                                </div>
                                :
                                <div className='d-flex '>
                                    <button className="btn border-0 text-white mx-2 me-4 mt-4 fs-5  position-relative" onClick={() => setcartView(true)}><img style={{ width: 30, height: 30 }} src={CartLogo} alt="X" />
                                        <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-success fs-8">
                                            {data.length}
                                        </span>
                                    </button>


                                    {cartView ? <Model onClose={() => setcartView(false)}><Cart /></Model> : null}


                                    <Link className="btn text-white mt-5 ms-4 bg-danger" disabled style={{ width: "80px", height: "30px", fontSize: "15px", margin: "9px", padding: "2px" }} onClick={handleLogout}>Log Out</Link>
                                </div>
                        }


                    </div>
                </div>
            </nav>
        </div>
    );
}
