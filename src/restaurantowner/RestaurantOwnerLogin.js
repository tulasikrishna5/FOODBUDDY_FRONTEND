import React, { useState } from 'react';
import config from '../config'
import {
  MDBBtn,
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBRow,
  MDBCol,
  MDBIcon,
  MDBInput
}
from 'mdb-react-ui-kit';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function RestaurantOwnerLogin({ onRestaurantOwnerLogin }) {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${config.url}/checkrestaurantOwnerlogin`, formData);
      if (response.data != null) {
        setMessage("Login Successful");
        setError("");
        onRestaurantOwnerLogin(); 

        localStorage.setItem('restaurantOwner', JSON.stringify(response.data));
        navigate("/restaurantownerhome");
      } else {
        setMessage("");
        setError("Login Failed");
      }
    } catch (error) {
      setMessage("");
      setError(error.message);
    }
  };
  return (
    <MDBContainer className="my-5">

      <MDBCard>
        <MDBRow className='g-0'>

          <MDBCol md='6'>
            <MDBCardImage src='https://storage.googleapis.com/pai-images/627d23e63c014c7889861858cbad1872.jpeg' alt="login form" className='rounded-start w-100'/>
          </MDBCol>

          <MDBCol md='6'>
            <MDBCardBody className='d-flex flex-column'>

              <div className='d-flex flex-row mt-2'>
                <MDBIcon fas icon="cubes fa-3x me-3" style={{ color: '#ff6219' }}/>
                <span className="h1 fw-bold mb-0">FOOD BUDDY</span>
              </div>

              <h5 className="fw-normal my-4 pb-3" style={{letterSpacing: '1px' , color: 'coral'}}>Restaurant Owner Login</h5>

              {error &&  <h4 align="center" style={{ fontFamily: "sans-serif", color: "#FF6347", fontWeight: "bold", fontSize: "15px", textDecoration: "underline" }}>{error}</h4>}
      {message && <h4 align="center" style={{ fontFamily: "sans-serif", color: "#FF6347", fontWeight: "bold", fontSize: "15px", textDecoration: "underline" }}>{message}</h4>}
                <h5 className="fw-normal my-4 pb-3" style={{ letterSpacing: '1px', color: 'coral' }}>Sign into your account</h5>
                <form onSubmit={handleSubmit}>
                  <MDBInput wrapperClass='mb-4' label='Email address' id="email" value={formData.email} onChange={handleChange} required size="lg" type='email' />
                  <MDBInput wrapperClass='mb-4' label='Password' id="password" value={formData.password} onChange={handleChange} required size="lg" type='password' />
                  <div className="text-center">
  <MDBBtn className="mb-4 px-5" color='danger' size='lg' type="submit">Login</MDBBtn>
</div>

                </form>
              <div className="text-center">
               
                <div style={{ color: '#393f81', marginBottom: '5px', paddingBottom: '2px' }}>
    Don't have an account? <a href="/restaurantownerregistration" style={{ color: '#393f81', textDecoration: 'underline' }}>Register here</a>
  </div>              
  </div>

              <div className='text-center'>
                <a href="#!" className="small text-muted me-1">Terms of use.</a>
                <a  href="#!" className="small text-muted">Privacy policy</a>
              </div>

            </MDBCardBody>
          </MDBCol>

        </MDBRow>
      </MDBCard>

    </MDBContainer>
  );
}

