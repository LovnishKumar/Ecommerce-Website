import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';


const Loggedout = () => {
  const [email, setEmail] = useState('');
  const [password, setpassword] = useState('');
  const dispatch = useDispatch()
  const user = useSelector(state=> state.user)



  const handleLogin = async (e) => {
    e.preventDefault();


    try {
      const response = await fetch('http://localhost:5000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password
        }),
      });

      const data = await response.json();
      toast(data.message)


   

      if (response.status == 200) {
        localStorage.setItem("token", data.result.token)
        localStorage.setItem("user", JSON.stringify(data.result.user))
        dispatch({type:'LOGIN_SUCCESS',payload:data.result.data})
        
      }
    } catch (error) {
      console.error('Error during login:', error);
    }
  };

  return (
    <>
  
      <div className="container-fluid login-container">
        <div className="row lgc">
          <div className="col-md-auto">
            <div className="card d-block">
              <div className="card-body">
                <h2 className="card-title text-center login-heading">Logged out</h2>
                <hr className="hr" />
              </div>
            </div>
          </div>
        </div>
      </div>
  
    </>
  );
};

export default Loggedout;
