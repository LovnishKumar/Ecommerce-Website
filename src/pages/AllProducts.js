import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom'; 

const AllProducts = () => {
    const [products, setProducts] = useState([]);
    const [userCart, setUserCart] = useState([]);
    const user = JSON.parse(localStorage.getItem('user'));
    const useremail = user ? user.email : '';
    const navigate = useNavigate(); 

    useEffect(() => {
        fetch('http://localhost:5000/getproducts')
            .then((response) => response.json())
            .then((data) => {
                if (data.products) {
                    setProducts(data.products);
                }
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);

    const addToCart = async (product) => {
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

    const removeProduct = (productName) => {
        fetch(`http://localhost:5000/removeproduct/${productName}`, {
            method: 'DELETE',
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.success) {
                    const updatedProducts = products.filter(
                        (product) => product.productName !== productName
                    );
                    setProducts(updatedProducts);
                }
            })
            .catch((error) => {
                console.error(error);
            });
    };

    const viewDetails = (productId) => {
        // Add logic to navigate to the product details page with productId
        // You can use React Router or any other navigation method here
        navigate(`/products/${productId}`);
        console.log(`View details for product with ID: ${productId}`);
    };

    return (
        <>
            <div className="container-fluid text-center pt-4">
                <h1>All Products</h1>
            </div>
            <div className="row justify-content-center">
                {products.map((product, index) => (
                    <div className="col-lg-4 col-md-6 col-sm-12 mb-4" key={index}>
                        <div className="card">
                            <img
                                className="card-img-top"
                                src={`http://localhost:5000${product.productImage}`}
                                alt="Product"
                                style={{ height: '20rem', objectFit: 'cover' }}
                                onClick={() => viewDetails(product._id)}
                            />
                            <div className="card-body">
                                <h5 className="card-title">{product.productName}</h5>
                                <p className="card-text">{product.productDescription}</p>
                                <p className="card-text">Price: ${product.productPrice}</p>
                                <div className="d-flex justify-content-between align-items-center">
                                    <button
                                        className="btn btn-dark add-to-cart"
                                        onClick={() => addToCart(product)}
                                    >
                                        <i className="fa-solid fa-cart-shopping"></i> Add to cart
                                    </button>
                                   
                                    {user && user.firstName === '1' && (
                                        <button
                                            className="btn btn-danger remove-btn"
                                            onClick={() => removeProduct(product.productName)}
                                        >
                                            X
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <ToastContainer />
        </>
    );
};

export default AllProducts;
