import React, { useState } from 'react';
import config from '../config';
import {
  MDBBtn,
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBRow,
  MDBCol,
  MDBInput 
} from 'mdb-react-ui-kit';
import 'react-toastify/dist/ReactToastify.css';

import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import "@fortawesome/fontawesome-free/css/all.min.css";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

export default function CustomerRegistration() {
  const [formData, setFormData] = useState({
    fullname: '',
    gender: '',
    dateofbirth: '',
    email: '',
    password: '',
    location: '',
    contact: ''
  });

  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  
  
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({...formData, [e.target.id]: e.target.value});
  };

  

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${config.url}/insertcustomer`, formData);
      
      if (response.status === 200) {
        setFormData({
          fullname: '',
          gender: '',
          dateofbirth: '',
          email: '',
          password: '',
          location: '',
          contact: ''
        });
      }
      
      
      
      setMessage(response.data);
      setError(''); 
      console.log(message)
      toast.success(`${response.data}, Please Check your mail 😊`,
      {
        postition:"top-right"
      })
      setTimeout(() => {
        navigate("/customerlogin");
      }, 3000);
    } catch(error) {
     
      setError(error.response.data);
      setMessage(''); 
      toast.error(`Try Again! `,
      {
        postition:"top-right"
      })
    }
    
  };
  
  return (
    <div>
      <ToastContainer position="top-right" />
       {
        error?<h3 align="center">Email or Phone number already exists</h3>:<h2> </h2>
       }
      <MDBContainer fluid className='bg-red'>
        <MDBRow className='d-flex justify-content-center align-items-center h-100'>
          <MDBCol>
            <MDBCard className='my-4'>
              <MDBRow className='g-0'>
                <MDBCol md='6' className="d-none d-md-block">
                  <MDBCardImage src='https://media.licdn.com/dms/image/D5612AQEF_Vv3rPOofg/article-cover_image-shrink_720_1280/0/1706898205827?e=1716422400&v=beta&t=paix_b5OiDu4YjP0kaxOX4RfWRKAMafzB5l-YY44uZg' alt="Sample photo" className="rounded-start" fluid/>
                </MDBCol>
                <MDBCol md='6'>
                  <MDBCardBody className='text-black d-flex flex-column justify-content-center'>
                    <h3 className="mb-5 text-uppercase fw-bold">Sign Up</h3>
                    <form onSubmit={handleSubmit}>
                      <MDBInput wrapperClass='mb-4' label='Name' size='lg' id="fullname" value={formData.fullname} onChange={handleChange} required />
                      <MDBInput wrapperClass='mb-4' label='Email' size='lg' type="email" id="email" value={formData.email} onChange={handleChange} required />
                      
                    

                      <MDBInput wrapperClass='mb-4' label='Password' size='lg' type="password" id="password" value={formData.password} onChange={handleChange} required />
                      <MDBInput wrapperClass='mb-4' label='Date Of Birth' size='lg' type="date" id="dateofbirth" value={formData.dateofbirth} onChange={handleChange} required />

                      <div className='d-md-flex justify-content-start align-items-center mb-4'>
                       
                        <select id="gender" value={formData.gender} onChange={handleChange} required>
                          <option value="">Select Gender</option>
                          <option value="male">Male</option>
                          <option value="female">Female</option>
                          <option value="others">Other</option>
                        </select>
                      </div>

                      <MDBInput wrapperClass='mb-4' label='Location' size='lg' id="location" value={formData.location} onChange={handleChange} required />
                      <MDBInput wrapperClass='mb-4' label='Contact Number' size='lg' type="text" id="contact" value={formData.contact} onChange={handleChange} required pattern="[6789][0-9]{9}" />

                      <div className="d-flex justify-content-end pt-3">
                        <MDBBtn color='light' size='lg'>Clear All</MDBBtn>
                        <MDBBtn type="submit" className='ms-2' color='danger' size='lg'>Register</MDBBtn>
                      </div>
                    </form>
                  </MDBCardBody>
                </MDBCol>
              </MDBRow>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </div>
  );
}
