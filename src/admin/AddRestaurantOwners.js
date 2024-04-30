import React, { useState, useRef } from 'react';
import axios from 'axios';
import { MDBBtn, MDBContainer, MDBCard, MDBCardBody, MDBCardImage, MDBRow, MDBCol, MDBInput } from 'mdb-react-ui-kit';
import { useNavigate } from 'react-router-dom';
import config from '../config'
import { toast } from 'react-toastify';
export default function AddRestaurantOwners() {
  const [formData, setFormData] = useState({
    fullname: '',
    gender: '',
    dateofbirth: '',
    email: '',
    location: '',
    restaurantname: '',
    contact: '',
    file: null
  });

  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, file: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formDataToSend = new FormData();
      formDataToSend.append('fullname', formData.fullname);
      formDataToSend.append('restaurantname', formData.restaurantname);
      formDataToSend.append('gender', formData.gender);
      formDataToSend.append('dateofbirth', formData.dateofbirth);
      formDataToSend.append('email', formData.email);
      formDataToSend.append('location', formData.location);
      formDataToSend.append('contact', formData.contact);
      formDataToSend.append('file', formData.file);

      const response = await axios.post(`${config.url}/addrestaurantowner`, formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      if (response.status === 200) {
        setFormData({
          fullname: '',
          gender: '',
          dateofbirth: '',
          email: '',
          location: '',
          restaurantname: '',
          contact: '',
          file: null
        });
        
      
        fileInputRef.current.value = ''; 
      }
      toast.success(`Restaurant Owner added Successfully`,
      {
        postition:"top-right"
      })
      setTimeout(() => {
        navigate("/adminhome");
      }, 3000);
      setMessage(response.data);
      setError('');
    } catch (error) {

      setError(error.response.data);
      setMessage('');
      toast.error(`Try Again!, The email id or Phone number already exists`,
      {
        postition:"top-right"
      })
    }
  };

  return (
    <div>
      <MDBContainer fluid className="bg-red">
        <MDBRow className="d-flex justify-content-center align-items-center h-100">
          <MDBCol>
            <MDBCard className="my-4">
              <MDBRow className="g-0">
                <MDBCol md="6" className="d-none d-md-block">
                  <MDBCardImage
                    src="https://media.licdn.com/dms/image/D5612AQEF_Vv3rPOofg/article-cover_image-shrink_720_1280/0/1706898205827?e=1716422400&v=beta&t=paix_b5OiDu4YjP0kaxOX4RfWRKAMafzB5l-YY44uZg"
                    alt="Sample photo"
                    className="rounded-start"
                    fluid
                  />
                </MDBCol>
                <MDBCol md="6">
                  <MDBCardBody className="text-black d-flex flex-column justify-content-center">
                    <h3 className="mb-5 text-uppercase fw-bold">Add Restaurant Owner</h3>

                    {message ? <h4 align="center">{message}</h4> : <h4 align="center">{error}</h4>}

                    <form onSubmit={handleSubmit} encType="multipart/form-data">
                      <MDBInput
                        wrapperClass="mb-4"
                        label="Name"
                        size="lg"
                        id="fullname"
                        value={formData.fullname}
                        onChange={handleChange}
                        required
                      />
                      <MDBInput
                        wrapperClass="mb-4"
                        label="Restaurant Name"
                        size="lg"
                        id="restaurantname"
                        value={formData.restaurantname}
                        onChange={handleChange}
                        required
                      />
                      <MDBInput
                        wrapperClass="mb-4"
                        label="Email"
                        size="lg"
                        type="email"
                        id="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                      />
                      <MDBInput
                        wrapperClass="mb-4"
                        label="Date Of Birth"
                        size="lg"
                        type="date"
                        id="dateofbirth"
                        value={formData.dateofbirth}
                        onChange={handleChange}
                        required
                      />
                      <div className="d-md-flex justify-content-start align-items-center mb-4">
                        <h6 className="fw-bold mb-0 me-4">Gender: </h6>
                        <select id="gender" value={formData.gender} onChange={handleChange} required>
                          <option value="">Select Gender</option>
                          <option value="male">Male</option>
                          <option value="female">Female</option>
                          <option value="others">Other</option>
                        </select>
                      </div>
                      <MDBInput
                        wrapperClass="mb-4"
                        label="Location"
                        size="lg"
                        id="location"
                        value={formData.location}
                        onChange={handleChange}
                        required
                      />
                      <MDBInput
                        wrapperClass="mb-4"
                        label="Contact Number"
                        size="lg"
                        type="text"
                        id="contact"
                        value={formData.contact}
                        onChange={handleChange}
                        required
                        pattern="[6789][0-9]{9}"
                      />
                      <div className="mb-4">
                        <label htmlFor="file" className="form-label fw-bold">
                          Restaurant Image:
                        </label>
                        <input
                          className="form-control"
                          type="file"
                          id="file"
                          ref={fileInputRef}
                          onChange={handleFileChange}
                          required
                        />
                      </div>

                      <div className="d-flex justify-content-end pt-3">
                        <MDBBtn color="light" size="lg" type="reset">
                          Reset all
                        </MDBBtn>
                        <MDBBtn className="ms-2" color="danger" size="lg" type="submit">
                          Submit form
                        </MDBBtn>
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
