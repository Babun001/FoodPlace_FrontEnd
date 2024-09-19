import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './screen.css';

export default function SignUp() {
    const [credentials, setcredentials] = useState({ name: "", email: "", password: "", geolocation: "" })
    let navigate = useNavigate()


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const responce = await fetch('https://foodplacebackend.onrender.com/api/createuser', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ name: credentials.name, email: credentials.email, password: credentials.password, location: credentials.Geolocation })
            });
            const json = await responce.json();
            
            if (json.success) {
                alert(`Hey! Myself Babun the developer of this site! I would like to draw your attention that this site is in Testing phase!`);
                alert(`Please LogIn with same Email-Id and Password!`);
                navigate("/login");
            }
            if(!json.success){
                alert("Enter Valid Credentials!");
            }
        }

        catch (error) {
            console.log("Error:", error);
        }


    }
    const onChange = (event) => {
        setcredentials({ ...credentials, [event.target.name]: event.target.value })
    }



    return (
        <>
            <div className='signIn bg-dark' style={{height:"100vh"}} >

                <div className='container' style={{ width: "330px", paddingTop: "8%" }} >
                    <main className="form-signin w-100 mt-3">
                        <form onSubmit={handleSubmit}>
                            <h2 className='h3 text-white ' style={{ "marginLeft": "10px" }}>Welcome to FoodPlace</h2>
                            <h1 className="h5 mt-3 fw-normal blockquote-footer">Please sign in </h1>
                            <div className="form-floating mb-1">
                                <input type="text" className="form-control" id="floatingInputt" placeholder="Name" autoComplete='off' name='name' value={credentials.name} onChange={onChange} />
                                <label htmlFor="floatingInputt">Name (more than 3 characters)</label>
                            </div>
                            <div className="form-floating mb-1">
                                <input type="email" className="form-control" id="floatingInput" autoComplete='off' placeholder="name@example.com" name='email' value={credentials.email} onChange={onChange} />
                                <label htmlFor="floatingInput">Email address</label>
                            </div>
                            <div className="form-floating mb-1">
                                <input type="password" className="form-control" id="Password" autoComplete='off' placeholder="Password" name='password' value={credentials.password} onChange={onChange} />
                                <label htmlFor="Password">Password</label>
                            </div>
                            <div className="form-floating mb-1">
                                <input type="text" className="form-control" id="Location" autoComplete='off' placeholder="Location" name='Geolocation' value={credentials.Geolocation} onChange={onChange} />
                                <label htmlFor="Password">Location</label>
                            </div>

                            <div className="form-check text-start my-3">
                                <input className="form-check-input" type="checkbox" value="remember-me" id="flexCheckDefault" name='checkbox' onChange={onChange} />
                                <label className="form-check-label text-white" htmlFor="flexCheckDefault">
                                    Privacy Policy
                                    <p>I agree to <Link className="link-opacity-50-hover" to="#">FoodPlace's Terms of Service,</Link><Link className="link-opacity-50-hover" to="#"> Privacy Policy</Link><span> and </span><Link className="link-opacity-50-hover" to="#">Content Policies.</Link></p>
                                </label>
                            </div>
                            <button className="btn btn-primary w-100 py-2" type="submit">Sign in</button>
                            <Link to="/login" className='mt-3 btn btn-danger w-100 py-2'>Already a user</Link>
                            <p className="mt-3 mb-3  text-white">© FoodPlace B@bun140623</p>
                        </form>
                    </main>
                    <script src="/docs/5.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-C6RzsynM9kWDrMNeT87bh95OGNyZPhcTNXj1NW7RuBCsyN/o0jlpcV8Qyq46cDfL" crossOrigin="anonymous"></script>
                </div>
            </div>
        </>
    );
}
