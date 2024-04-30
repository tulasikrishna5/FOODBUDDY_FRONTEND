import React, { useRef, useState } from 'react';
import config from '../config'
import {
  MDBBtn,
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBRow,
  MDBCol,
  MDBInput,
  
}
from 'mdb-react-ui-kit';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import "@fortawesome/fontawesome-free/css/all.min.css";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

export default function RestaurantOwnerRegistration() {
  const [formData, setFormData] = useState({
    fullname: '',
    gender: '',
    dateofbirth: '',
    email: '',
    password: '',
    location: '',
    restaurantname:'',
    contact: '',
    file: null
  });

  const fileInputRef = useRef(null); 


  const [message, setMessage] = useState('');
 
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const handleChange = (e) => 
  {
    
    setFormData({...formData, [e.target.id]: e.target.value});
    
    
  };
  const handleFileChange = (e) => {
    setFormData({ ...formData, file: e.target.files[0] });
  };

  const handleSubmit = async (e) => 
  {
    e.preventDefault();
    try 
    {
      const formDataToSend = new FormData();
      
      formDataToSend.append('fullname', formData.fullname);
      formDataToSend.append('restaurantname', formData.restaurantname);
      formDataToSend.append('gender', formData.gender);
      formDataToSend.append('dateofbirth', formData.dateofbirth);
      formDataToSend.append('email', formData.email);
      formDataToSend.append('password', formData.password);
      formDataToSend.append('location', formData.location);
      formDataToSend.append('contact', formData.contact);
      formDataToSend.append('file', formData.file); 
      const response = await axios.post(`${config.url}/insertrestaurantOwner`, formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data' // Set content type for FormData
        }
      });
      
      if (response.status === 200) {
        setFormData({
          fullname: '',
        gender: '',
          dateofbirth: '',
          email: '',
          password: '',
          location: '',
          restaurantname:'',
          contact: '',
          file: null
        });
        
        fileInputRef.current.value = '';
      }
     
     
      setMessage(response.data);
      setError(''); 
      console.log(message)
      toast.success(`Registration Successful, Please Check your mail 😊`,
      {
        postition:"top-right"
      })
      setTimeout(() => {
        navigate("/restaurantlogin");
      }, 3000);
      
    } 
    catch (error) 
    { toast.error(`Try Again!, The email id or Phone number already exists`,
    {
      postition:"top-right"
    })
      setError(error.response.data);
      setMessage('');
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
          <MDBCardImage src='https://storage.googleapis.com/pai-images/627d23e63c014c7889861858cbad1872.jpeg' alt="Sample photo" className="rounded-start" fluid/>
        </MDBCol>

        <MDBCol md='6'>

          <MDBCardBody className='text-black d-flex flex-column justify-content-center'>
            <h3 className="mb-5 text-uppercase fw-bold">Sign Up</h3>


            <form onSubmit={handleSubmit} encType="multipart/form-data">
            <MDBInput wrapperClass='mb-4' label='Name' size='lg'id="fullname" value={formData.fullname} onChange={handleChange} required/>
            <MDBInput wrapperClass='mb-4' label='Restaurant Name' size='lg'id="restaurantname" value={formData.restaurantname} onChange={handleChange} required/>
            <MDBInput wrapperClass='mb-4' label='Email' size='lg'  type="email" id="email" value={formData.email} onChange={handleChange} required />
            <MDBInput wrapperClass='mb-4' label='Password' size='lg' type="password" id="password" value={formData.password} onChange={handleChange}  required/>
            <MDBInput wrapperClass='mb-4' label='Date Of Birth' size='lg' type="date" id="dateofbirth" value={formData.dateofbirth} onChange={handleChange} required/>

            <div className='d-md-flex justify-content-start align-items-center mb-4'>
  
  <select id="gender" value={formData.gender} onChange={handleChange} required>
  <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="others">Other</option>
  </select>
</div>


            

            <MDBInput wrapperClass='mb-4' label='Location' size='lg'  id="location" value={formData.location} onChange={handleChange} required/>
            <MDBInput wrapperClass='mb-4' label='Contact Number' size='lg' type="text" id="contact" value={formData.contact} onChange={handleChange} required pattern="[6789][0-9]{9}"/>
            <h6 className="fw-bold mb-0 me-4">Restaurant Image: </h6>
            <MDBInput wrapperClass='mb-4'  size='lg' type="file" id="file" ref={fileInputRef} onChange={handleFileChange} required/>

            

            <div className="d-flex justify-content-end pt-3">
              <MDBBtn color='light' size='lg'>Clear all</MDBBtn>
              <MDBBtn className='ms-2' color='danger' size='lg'>Register</MDBBtn>
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
  )
}
