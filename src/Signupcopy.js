import React, { useState } from 'react';
import Header from './Header';
import Footer from './Footer';
import { useNavigate } from 'react-router-dom';



const Signupcopy = () => {

  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  const handleSignup = async (e) => {
    try {

      e.preventDefault();
      const response = await fetch('http://localhost:5000/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          password,
          email,
          address
        }),
      });

      const data = await response.json();
      if (response.ok) {
        toast(data.message);
        navigate('/login');
      } else {
        toast(data.error);
      }

      // Optionally, you can perform additional actions after successful registration.
    } catch (error) {
      console.error('Error during signup:', error);
      // Handle error state or show error message to the user.
    }
  };

  return (
    <>
      <Header />
      <div className="container-fluid login-container">
        <div className="row lgc">
          <div className="col-md-auto">
            <div className="card d-block">
              <div className="card-body">
                <h2 className="card-title text-center login-heading">Signup</h2>
                <hr className="hr" />
                <form onSubmit={handleSignup}>
                <div className="mb-3">
                    <label className="form-label" htmlFor="firstName">
                      First Name
                    </label>
                    <input
                      className="form-control lgup"
                      type="text"
                      name="firstName"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      placeholder="Enter your First Name"
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label" htmlFor="lastName">
                      Last Name
                    </label>
                    <input
                      className="form-control lgup"
                      type="text"
                      name="lastName"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      placeholder="Enter your Last Name"
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label" htmlFor="username">
                      Username
                    </label>
                    <input
                      className="form-control lgup"
                      type="text"
                      name="username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      placeholder="Enter your username"
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label" htmlFor="password">
                      Password
                    </label>
                    <input
                      className="form-control lgup"
                      type="password"
                      name="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter your password"
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label" htmlFor="email">
                      Email
                    </label>
                    <input
                      className="form-control lgup"
                      type="text"
                      name="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email"
                    />
                  </div>
                  
                  <div className="mb-3">
                    <label className="form-label" htmlFor="address">
                      Address
                    </label>
                    <input
                      className="form-control lgup"
                      type="file"
                      name="address"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      placeholder="Enter your Address"
                    />
                  </div>
                  <div className="signuplink">
                    <a href="/login">Already have an account? Click here to Login</a>
                  </div>
                  <button
                    className="btn btn-outline-success header-login-btn l-b navbar-text"
                    type="submit"
                  >
                    Signup
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Signupcopy;
