import React from 'react';
import { Link } from 'react-router-dom';
import './style.css';

export default function Footer() {
  return (
    <div>
      <div className='bg-secondary'><hr className='border-0.1'></hr></div>

      <footer className="d-flex flex-wrap justify-content-between align-items-center py-3">
        <div className="col-md-4 d-flex align-items-center">
          <Link href="/" className="mb-3 me-2 mb-md-0 text-muted text-decoration-none lh-1">
          </Link>
          <span id='t1' className="text-white">© 2023 FoodPlace, Inc</span>
          
        </div>
        <div id='t2' className='mx-2'>
            <Link className='btn text-white'  to='/about'>AboutMe</Link>
            <Link className='btn text-white' to='/connectMe '>Contacts</Link>
          </div>
      </footer>
    </div>
  );
}
