import React from 'react';

import './styles/Home.css';
import './styles/Header.css';
import './styles/Footer.css';
import './styles/Login.css';
import './styles/ContactUs.css';
import './styles/AllProducts.css';
import './styles/Cart.css';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';

import AddProducts from './pages/AddProducts';
import NotFound from './pages/NotFound';
import ContactUs from './pages/ContactUs';
import Loggedout from './pages/Loggedout';
import Payment from './pages/Payment';
import Orders from './pages/Orders';
import Slider from './components/Slider'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ClipLoader from "react-spinners/ClipLoader";
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';






import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';



import { NavLink, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import AllProducts from './pages/AllProducts';
import Cart from './pages/Cart';
import AllProductsWomen from './pages/AllProductsWomen';
import AllProductsMen from './pages/AllProductsMen';
import AllProductsKids from './pages/AllProductsKids';
import MenShirts from './pages/MenShirts';
import MenPants from './pages/MenPants';
import MenHoodies from './pages/MenHoodies';
import WomenPants from './pages/WomenPants';
import WomenSkirts from './pages/WomenSkirts';
import WomenDresses from './pages/WomenDresses';
import Featured from './pages/Featured';
import ProductDetails from './pages/productdetails';
import Admin from './pages/Admin';

function App() {

  function DynamicRouting() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const user = useSelector(state => state.userReducer);
    

    useEffect(() => {

      const userData = JSON.parse(localStorage.getItem("user"));
      if (userData) {//when user has a login active session
        dispatch({ type: "LOGIN_SUCCESS", payload: userData});
        // navigate("/");
        
      }
       navigate("/");
    }, []);

    return (
      
      <Routes>
        location.reload();
        <Route exact path="/" element={<Home />}></Route>
        <Route exact path="/login" element={<Login />}></Route>
        <Route exact path="/signup" element={<Signup />}></Route>
        <Route exact path="/contactus" element={<ContactUs />}></Route>
        <Route exact path="/addproducts" element={<AddProducts />}></Route>
        <Route exact path="/allproducts" element={<AllProducts />}></Route>
        <Route exact path="/allproductswomen" element={<AllProductsWomen />}></Route>
        <Route exact path="/allproductsmen" element={<AllProductsMen />}></Route>
        <Route exact path="/allproductskids" element={<AllProductsKids />}></Route>
        <Route exact path="/menshirts" element={<MenShirts />}></Route>
        <Route exact path="/menpants" element={<MenPants />}></Route>
        <Route exact path="/menhoodies" element={<MenHoodies />}></Route>
        <Route exact path="/womenpants" element={<WomenPants />}></Route>
        <Route exact path="/womenskirts" element={<WomenSkirts />}></Route>
        <Route exact path="/womendresses" element={<WomenDresses />}></Route>
        <Route exact path="/cart" element={<Cart />}></Route>
        <Route exact path="/payment" element={<Payment />}></Route>
        <Route exact path="/orders" element={<Orders />}></Route>
        <Route exact path="/addfeatured" element={<Featured />}></Route>
        <Route path="/products/:productId"  element={<ProductDetails />} />
        <Route exact path="/admin" element={<Admin />}></Route>
      </Routes>
    )
  }


  return (
    <div className='app-bg'>
      <Router>
      <ToastContainer autoClose={800}/>
        <Header></Header>
        <DynamicRouting />
        <Footer></Footer>
      </Router>
    </div>
  );
}

export default App;

