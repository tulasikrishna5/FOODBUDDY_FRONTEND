import React, { useState } from 'react';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import "@fortawesome/fontawesome-free/css/all.min.css";
import axios from 'axios';
import { MDBBtn, MDBContainer, MDBCard, MDBCardBody, MDBCardImage, MDBRow, MDBCol, MDBIcon, MDBInput } from 'mdb-react-ui-kit';
import { useNavigate } from 'react-router-dom';
import config from '../config'

export default function AdminLogin({ onAdminLogin }) {
  const [formData, setFormData] = useState({
    username: '',
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
      const response = await axios.post(`${config.url}/checkadminlogin`, formData);
      if (response.data != null) {
        setMessage("Login Successful");
        setError("");
        onAdminLogin(); 

        localStorage.setItem('admin', JSON.stringify(response.data));
        navigate("/adminhome");
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
            <MDBCardImage src='https://storage.googleapis.com/fastwork-static/075ddfce-1ce9-421f-8f6c-00f8334ba073.jpg' alt="Food Buddy" style={{ width: '100%', height: 'auto' }} />
          </MDBCol>
          <MDBCol md='6'>
            <MDBCardBody className='d-flex flex-column'>
              <div className='d-flex flex-row mt-2'>
                <MDBIcon fas icon="cubes fa-3x me-3" style={{ color: '#ff6219' }} />
                <span className="h1 fw-bold mb-0">FOOD BUDDY</span>
              </div>
              {error && <h4 align="center" style={{ fontFamily: "sans-serif", color: "#FF6347", fontWeight: "bold", fontSize: "15px", textDecoration: "underline" }}>{error}</h4>}
              {message && <h4 align="center" style={{ fontFamily: "sans-serif", color: "#FF6347", fontWeight: "bold", fontSize: "15px", textDecoration: "underline" }}>{message}</h4>}
              <h5 className="fw-normal my-4 pb-3" style={{ letterSpacing: '1px', color: 'coral' }}>Sign into your account</h5>
              <form onSubmit={handleSubmit}>
                <MDBInput wrapperClass='mb-4' label='UserName' id="username" value={formData.username} onChange={handleChange} required size="lg" type='text' />
                <MDBInput wrapperClass='mb-4' label='Password' id="password" value={formData.password} onChange={handleChange} required size="lg" type='password' />
                <div className="text-center">
                  <MDBBtn className="mb-4 px-5" color='danger' size='lg' type="submit">Login</MDBBtn>
                </div>
              </form>
            </MDBCardBody>
          </MDBCol>
        </MDBRow>
      </MDBCard>
    </MDBContainer>
  )
}
