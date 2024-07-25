import React from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';



const Header = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const dispatch = useDispatch();
    const navigate = useNavigate();
  
    const handleLoggedout = () => {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      localStorage.removeItem('cart');
      toast('Logged out');
      dispatch({ type: 'LOGIN_ERROR' });
      navigate('/');
    };
  
    const handleSearch = async (e) => {
      e.preventDefault();
  
      try {
        const response = await axios.get(`http://localhost:5000/searchproducts?query=${searchQuery}`);
        const products = response.data.products;
    
        if (products.length === 0) {
          toast('No products found for the search query');
        }
    
        setSearchResults(products);
      } catch (error) {
        console.error('Error fetching search results:', error);
        toast('Error fetching search results');
      }
    };
    const viewDetails = (productId) => {
        
        navigate(`/products/${productId}`);
        console.log(`View details for product with ID: ${productId}`);
    };
  
    const handleLogin = () => {
      navigate('/login');
    };
    return (
        <>
            <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
                <div className="container-fluid">
                    <a className="navbar-brand b" href="/"><h1>Ecommerce</h1></a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                {/**/}
                            </li>
                        </ul>

                        <form onSubmit={handleSearch} className="header-search d-flex mx-auto">
        <input
          className="form-control"
          type="search"
          placeholder="Search"
          aria-label="Search"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button className="btn  btn-dark header-search-btn" type="submit">
          Search
        </button>
      </form>

      {/* Display search results */}
      {searchResults.length > 0 && (
        <div className="search-results">
          <h2>Search Results</h2>
          <ul>
            {searchResults.map((product) => (
              <li key={product._id}>
                <Link to={`/products/${product._id}`}>{product.productName}</Link>
              </li>
            ))}
          </ul>
        </div>
      )}

            {/* Display search results */}
            

                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                {/**/}
                            </li>
                        </ul>

                        <div className="l-c d-flex flex-md-column flex-lg-row flex-column">
                            {localStorage.getItem("token") ? '' :
                                <button onClick={handleLogin} className="btn btn-dark header-login-btn">
                                    Login
                                </button>}
                            {localStorage.getItem("token") ? <button onClick={handleLoggedout} className="btn btn-dark header-login-btn">
                                Logout
                            </button> : ""}
                            <Link to="/cart" className="btn btn-dark header-cart-btn">
                                <i className="fa-solid fa-cart-shopping"></i>Cart
                            </Link>
                            <Link to="/orders" className="btn btn-dark header-cart-btn">
                                Orders
                            </Link>
                        </div>
                    </div>
                </div>
            </nav>

            <div className="container-fluid header bn ">
                <ul className="nav">
                    <li className="nav-item nav-2 ">
                        <Link to="/" className="nav-link" aria-current="page" >Home</Link>
                    </li>
                    {(!user) ? "" : user.firstName === "1" ? (
                        <>

                            <li className="nav-item nav-2">
                                <Link to="/addproducts" className="nav-link" aria-current="page">Add Products</Link>
                            </li>
                            <li className="nav-item nav-2">
                                <Link to="/addfeatured" className="nav-link" aria-current="page">Add Featured</Link>
                            </li>
                        </>

                    ) : null}


                    <li className="nav-item nav-2">
                        <Link to='/allproducts' className="nav-link">All Products</Link>
                    </li>
                    <li className="nav-item nav-2 nav-2 dropdown">
                        <a href='#' className="women-btn nav-link dropdown-toggle" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                            Women
                        </a>
                        <ul className="dropdown-menu">
                            <li><Link to='/allproductswomen' className="dropdown-item" >All Products</Link></li>
                            <li><Link to='/womendresses' className="dropdown-item" >Dresses</Link></li>
                            <li><Link to='/womenpants' className="dropdown-item" >Pants</Link></li>
                            <li><Link to='/womenskirts' className="dropdown-item" >Skirts</Link></li>

                        </ul>
                    </li>
                    <li className="nav-item nav-2 dropdown">
                        <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                            Men
                        </a>
                        <ul className="dropdown-menu">
                            <li><Link to='/allproductsmen' className="dropdown-item" >All Products</Link></li>
                            <li><Link to='/menshirts' className="dropdown-item">Shirts</Link></li>
                            <li><Link to='/menpants' className="dropdown-item">Pants</Link></li>
                            <li><Link to='/menhoodies' className="dropdown-item">Hoodies</Link></li>

                        </ul>
                    </li>

                    <li className="nav-item nav-2">
                        <Link to='/allproductskids' className="nav-link">Kids</Link>
                    </li>
                    <li className="nav-item nav-2 hc">
                        <Link className="nav-link header-contact" to="/contactus">Contact</Link>
                    </li>
                </ul>
            </div>

            <div className=" new-contact cmv">
                <ul className="nav nav-2">
                    <li className="nav-item"><a className="nav-link" href="../contactus">Contact</a></li>
                </ul>
            </div>
        </>
    );
};

export default Header;
