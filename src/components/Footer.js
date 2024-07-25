import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <>

            <div className="footer-div  bg-dark">
                <div className="row text-center">
                    <div className="col-md-3">
                        <Link to="/allproductswomen"><h6>Women</h6></Link>

                        <div><Link to="/womendresses">Dresses</Link></div>
                        <div><Link to="womenpants">Pants</Link></div>
                        <div><Link to="/womenskirts">Skirts</Link></div>
                    </div>
                    <div className="col-md-3">
                        <Link to="/allproductsmen"><h6>Men</h6></Link>

                        <div><Link to="/shirts">Shirts</Link></div>
                        <div><Link to="/menpants">Pants</Link></div>
                        <div><Link to="/menhoodies">Hoodies</Link></div>
                    </div>
                    <div className="col-md-3">
                        <Link to="/allproductskids"><h6>Kids</h6></Link>

                    </div>
                    <div className="col-md-3">
                        <h6>Links</h6>

                        <div><Link to="/">Home</Link></div>
                        <div><Link to="/login">Login</Link></div>
                        <div><Link to="contactus">Contact</Link></div>
                    </div>
                </div>

                <hr className="hr" />
                <div className="text-center">Copyright @Ecommerce 2023-24</div>
            </div>

        </>
    )
}

export default Footer;