import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ProductDetails = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState({});
  const user = JSON.parse(localStorage.getItem('user'));
  const useremail = user ? user.email : '';

  useEffect(() => {
    fetch(`http://localhost:5000/getproduct/${productId}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.product) {
          setProduct(data.product);
        } else {
          // Handle case where product is not found
          console.error('Product not found');
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, [productId]);

  const addToCart = async () => {
    try {
      const response = await fetch(`http://localhost:5000/addtocart/${useremail}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ product }),
      });

      if (response.ok) {
        toast('Product added to cart');
      } else {
        const data = await response.json();
        toast(data.error || 'Failed to add product to cart');
      }
    } catch (error) {
      console.error('Error:', error);
      toast('Please login first');
    }
  };

  return (
    <div className="container text-center mt-4">
      <h1>Product Details</h1>
      <div className="row mt-4">
        <div className="col-lg-4 mb-4">
          <img
            className="img-fluid"
            src={`http://localhost:5000${product.productImage}`}
            alt={product.productName}
          />
        </div>
        <div className="col-lg-8 mb-4">
          <h2>{product.productName}</h2>
          <p>{product.productDescription}</p>
          <p className="font-weight-bold">Price: ${product.productPrice}</p>
          <button
            className="btn btn-dark add-to-cart"
            onClick={addToCart}
          >
            <i className="fa-solid fa-cart-shopping"></i> Add to cart
          </button>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default ProductDetails;
