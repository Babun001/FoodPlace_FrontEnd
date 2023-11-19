import './App.css'
import Home from "./Screens/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";


import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle';
import 'bootstrap/dist/js/bootstrap.bundle'
import SignUp from './Screens/SignUp';
import Login from './Screens/Login';
import ConnectMe from './Screens/connect'
import About from './Screens/about'
import { CartProvider } from './Components/ContextReducer';

function App() {
  return (

    <CartProvider>
      <Router>
        <div className='bg-dark'>
          <Routes>
            <Route exact path='/' element={<Home />} />
            <Route exact path='/Signup' element={<SignUp />} />
            <Route exact path='/login' element={<Login />} />
            <Route exact path='/connectMe' element={<ConnectMe />} />
            <Route exact path='/about' element={<About />} />
          </Routes>
        </div>
      </Router>
    </CartProvider>



  );
}

export default App;
