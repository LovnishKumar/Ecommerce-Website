import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
const AllProductsKids = () => {
    const [products, setProducts] = useState([]);
    const user = JSON.parse(localStorage.getItem("user"));
    const navigate = useNavigate(); 

    useEffect(() => {
        // Make an API request to fetch products when the component mounts
        fetch('http://localhost:5000/getproductsforkids')
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                if (data.products) {
                    setProducts(data.products);
                }
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);

    const removeProduct = (productName) => {
        // Make an API request to remove the product from the database
        fetch(`http://localhost:5000/removeproduct/${productName}`, {
            method: 'DELETE',
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.success) {
                    // Remove the product from the local state
                    const updatedProducts = products.filter(
                        (product) => product.productName !== productName // Use productName for comparison
                    );
                    setProducts(updatedProducts);
                }
            })
            .catch((error) => {
                console.error(error);
            });
    };

    const viewDetails = (productId) => {
        
        navigate(`/products/${productId}`);
        console.log(`View details for product with ID: ${productId}`);
    };



    return (
        <>
            <div className="ap text-center"></div>
            <div className="container-fluid text-center">
                <h1>Kids</h1>
            </div>
            <div className="row ap text-center">
                {products.map((product, index) => (
                    <div className="col-lg-3 col-md-4 col-sm-6" key={index}>
                        <div className="card d-block" style={{ width: '18rem' }}>
                        {(!user)? "": user.firstName==="1" ? (
                            <button
                                className="btn btn-danger remove-btn"
                                onClick={() => removeProduct(product.productName)}
                            >
                                x
                            </button>
                                ) : null}
                            <img className="pi3 card-img-top" onClick={() => viewDetails(product._id)} src={`http://localhost:5000${(product.productImage)}`} alt="Product" />


                            <div className="card-body">
                                <h5 className="card-title">{product.productName}</h5>
                                <p className="card-text">{product.productDescription}</p>
                                <p className="card-text">Price: ${product.productPrice}</p>
                            </div>
                            <button
                                className="btn btn-dark add-to-cart navbar-text apcb"
                                type="submit"
                            >
                                <i className="addto-cart-icon fa-solid fa-cart-shopping"></i> Add to cart
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
};

export default AllProductsKids;


