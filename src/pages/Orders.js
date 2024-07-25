import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';

const Orders = () => {
  const [userCart, setUserCart] = useState([]);
  const user = JSON.parse(localStorage.getItem('user'));
  const useremail = user ? user.email : '';

  useEffect(() => {
    fetch(`http://localhost:5000/getorders/${useremail}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.userorders) {
          setUserCart(data.userorders);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, [useremail]);

  return (
    <>
      <div className="container-fluid row cmd">
        <div className="">
          <div className="card">
            <div className="card-body">
              <div className="card-header text-center">
                <h2>Order History</h2>
              </div>
              {userCart.length === 0 ? (
                <p>Buy what you love and complete your first order</p>
              ) : (
                userCart.map((order, index) => (
                  <div className="pb-2" key={index}>
                    {/* <div className=""> */}
                      <div className="card  ">
                        {order.products.map((product, productIndex) => (
                          <div className='row' key={productIndex}>
                            <div className='col-md-6 pb-1 pt-1 d-flex align-items-center justify-content-center'>
                              <img
                                src={"http://localhost:5000" + product.productImage}
                                alt={`Product ${productIndex + 1}`}
                                style={{ maxWidth: '300px', height: '200px' }}
                              />
                            </div>
                            <div className='col-md-6 d-flex align-items-center justify-content-center'>
                              <div>
                                <h5>{product.productName}</h5>
                                <div>${product.productPrice}</div>
                                <div>Quantity: {product.cartQuantity}</div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    {/* </div> */}
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Orders;
