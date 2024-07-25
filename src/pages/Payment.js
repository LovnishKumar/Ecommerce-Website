import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { API_BASE_URL } from '../config';
import { ToastContainer, toast } from 'react-toastify';

import Header from '../components/Header';
import Footer from '../components/Footer';

const Payment = () => {



    const [userCart, setUserCart] = useState([]);
    const [cartValue, setCartValue] = useState();

    // const [updatedCart, setUpdatedCart] = useState([])
    const user = JSON.parse(localStorage.getItem('user'));
    const useremail = user ? user.email : '';

    useEffect(() => {
        fetch(`http://localhost:5000/getcart/${useremail}`)
            .then((response) => response.json())
            .then((data) => {
                if (data.usercart) {
                    setUserCart(data.usercart);
    
                    // Calculate cart value by multiplying quantity and price for each product
                    const cartv = data.usercart.reduce((total, product) => {
                        const productValue = product.cartQuantity * product.productPrice;
                        return total + productValue;
                    }, 0);
    
                    // Set the calculated cart value in state
                    setCartValue(cartv);
                }
            })
            .catch((error) => {
                console.error(error);
            });
    }, [useremail]);



    const navigate = useNavigate();
    const [paymentMethod, setPaymentMethod] = useState('');
    const [upi, setUpi] = useState('');
    const [cardNumber, setCardNumber] = useState('');
    const [expiryDate, setExpiryDate] = useState('');
    const [cvv, setCvv] = useState('');
    const [cardHolderName, setCardHolderName] = useState(''); // Initialize cardholder's name state

    const handleOrder = (e) => {
        e.preventDefault();

        if (paymentMethod === 'upi') {
            console.log('UPI:', upi);

            // Send the 'upi' value to the backend
            fetch(`http://localhost:5000/orderFinal/${userCart}/${useremail}/`, {
                method: 'POST',
                body: JSON.stringify({ upi }),
                headers: {
                    'Content-Type': 'application/json',
                },
            })
                .then((response) => response.json())
                .then((data) => {

                    toast(data.message);
                    // Navigate to '/'
                    navigate('/');


                })

                .catch((error) => {
                    console.error(error);
                });
        } else if (paymentMethod === 'cards') {
            console.log('Card Number:', cardNumber);
            console.log('Expiry Date:', expiryDate);
            console.log('CVV:', cvv);
            console.log('Cardholder Name:', cardHolderName);

            // Send the card information and 'upi' value to the backend
            fetch(`http://localhost:5000/orderFinal/${userCart}/${useremail}/`, {
                method: 'POST',
                body: JSON.stringify({ cardNumber, expiryDate, cvv, cardHolderName }),
                headers: {
                    'Content-Type': 'application/json',
                },
            })
                .then((response) => response.json())
                .then((data) => {
                    if (data.success) {
                        toast("order placed");
                    } else {
                        toast("order failed");
                    }
                })
                .catch((error) => {
                    console.error(error);
                });
        }
    };



    const renderPaymentFields = () => {
        if (paymentMethod === 'upi') {
            return (
                <div className="mb-3">
                    <label className="form-label" htmlFor="upi">
                        UPI ID
                    </label>
                    <input
                        className="form-control lgup"
                        type="text"
                        name="upi"
                        value={upi}
                        onChange={(e) => setUpi(e.target.value)}
                        placeholder="Enter your UPI ID"
                    />
                </div>
            );
        } else if (paymentMethod === 'cards') {
            return (
                <div>
                    <div className="mb-3">
                        <label className="form-label" htmlFor="cardNumber">
                            Card Number
                        </label>
                        <input
                            className="form-control lgup"
                            type="text"
                            name="cardNumber"
                            value={cardNumber}
                            onChange={(e) => setCardNumber(e.target.value)}
                            placeholder="Enter your card number"
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label" htmlFor="expiryDate">
                            Expiry Date
                        </label>
                        <input
                            className="form-control lgup"
                            type="text"
                            name="expiryDate"
                            value={expiryDate}
                            onChange={(e) => setExpiryDate(e.target.value)}
                            placeholder="MM/YYYY"
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label" htmlFor="cvv">
                            CVV
                        </label>
                        <input
                            className="form-control lgup"
                            type="text"
                            name="cvv"
                            value={cvv}
                            onChange={(e) => setCvv(e.target.value)}
                            placeholder="Enter your CVV"
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label" htmlFor="cardHolderName">
                            Cardholder's Name
                        </label>
                        <input
                            className="form-control lgup"
                            type="text"
                            name="cardHolderName"
                            value={cardHolderName}
                            onChange={(e) => setCardHolderName(e.target.value)}
                            placeholder="Enter cardholder's name"
                        />
                    </div>
                </div>
            );
        }
    };

    return (
        <>
            <div className="container-fluid login-container">
                <div className="row lgc">
                    <div className="col-md-auto">
                        <div className="card d-block">
                            <div className="card-body">
                                <h2 className="card-title text-center login-heading">Payment of RS{cartValue}</h2>
                                <hr className="hr" />
                                <form onSubmit={handleOrder}>
                                    <div className="mb-3">
                                        <label className="form-label" htmlFor="paymentMethod">
                                            Select method
                                        </label>
                                        <select
                                            className="form-select lgup"
                                            name="paymentMethod"
                                            onChange={(e) => setPaymentMethod(e.target.value)}
                                            value={paymentMethod}
                                        >
                                            <option value="">Select Payment Method</option>
                                            <option value="upi">UPI</option>
                                            <option value="cards">Cards</option>
                                        </select>
                                    </div>
                                    {renderPaymentFields()}
                                    <button
                                        className="btn btn-dark header-login-btn l-b navbar-text"
                                        type="submit"
                                    >
                                        Order
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Payment;
