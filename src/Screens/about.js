import React from 'react';
import AppImage from '../ImagesAndIcons/appImage.png';
import { Link } from 'react-router-dom';

export default function about() {
    return (
        <>
            <div className="container bg-dark col-xxl-8 px-4 py-5" style={{height:'100vh', display:"flex"}}>
                <div className="row flex-lg-row-reverse align-items-center g-5 py-5">
                    <div className="container col-10 col-sm-10 col-lg-6">
                        <img src={AppImage} className="d-block mx-lg-auto img-fluid" alt="Bootstrap Themes" width="700" height="500" loading="lazy" style={{borderRadius:"20px"}}/>
                    </div>
                    <div className="col-lg-6">
                        <h3 className="display-5 fw-bold lh-1 mb-3 text-white">About Me</h3>
                        <h1 className="display-5 fw-bold lh-1 mb-3 text-white">Hi, I'm Babun Roy</h1>
                        <p className="lead text-white fs-3">Pursuing Masters at Meghnad Saha Institute Of Technology(MSIT)</p>
                        <p className="lead text-white">Feel free to explore the rest of the website and don't hesitate to contact me if you have any questions or just want to say hello!</p>
                        <div className="d-grid gap-2 d-md-flex justify-content-md-start">
                            <Link to="/connectMe" className="btn btn-info btn-lg px-4 me-md-2">Connect Me..</Link>
                            <Link to="/" className="btn btn-outline-secondary btn-lg px-4">Go Back</Link>

                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
