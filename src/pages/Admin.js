import React, { useState } from 'react';
import { toast } from 'react-toastify';

const Admin = () => {
  const [email, setEmail] = useState('');
  const [password, setpassword] = useState('');

  const handleLogin = async () => {
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

      if (response.ok) {
        toast(data.message)
      
      } else {
        toast(data.message)
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
                <h2 className="card-title text-center login-heading">Admin Login</h2>
                <hr className="hr" />
                <form onSubmit={handleLogin}>
                  <div className="mb-3">
                    <label className="form-label" htmlFor="email">
                      Email
                    </label>
                    <input
                      className="form-control lgup"
                      type="text"
                      name="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
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
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setpassword(e.target.value)}
                    />
                  </div>

                  <div className="signuplink">
                    <a href="/login">Go back to user login</a>
                  </div>

                  <button
                    
                    className="btn btn-dark header-login-btn l-b navbar-text"
                    type="submit"
                  >
                    Login
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

export default Admin;
