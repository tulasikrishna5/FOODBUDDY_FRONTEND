import React, { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

import { BsFillHouseDoorFill, BsPinMapFill, BsCartFill, BsFillPersonFill } from 'react-icons/bs';
import { IoRestaurant } from 'react-icons/io5';
import { Route, Routes, useNavigate } from 'react-router-dom';
import CustomerHome from './CustomerHome';
import BrowseRestaurants from './BrowseRestaurants';
import Menu from './Menu';
import Cart from './Cart';
import Success from './Success';
import Failure from './Failure';
import Profile from './Profile';
import ForgotPassword from './ForgotPassword';
import './CustomerNavBar.css'; // Import custom CSS styles
import UpdateProfile from './UpdateProfile';
import ViewOrders from './ViewOrders';

export default function CustomerNavBar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('isCustomerLoggedIn');
    localStorage.removeItem('customer');
    navigate('/customerlogin'); 
    window.location.reload()
  };

  const [customerData, setCustomerData] = useState(null);

  useEffect(() => {
    const storedCustomerData = localStorage.getItem('customer');
    if (storedCustomerData) {
      const parsedCustomerData = JSON.parse(storedCustomerData);
      setCustomerData(parsedCustomerData);
    }
  }, []);

  return (
    <div>
      <Navbar expand="lg" className="bg-orange navbar-custom sticky-top">
        <Container fluid>
          <Navbar.Brand href="#">FoodBuddy</Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav className="mx-auto my-2 my-lg-0" style={{ maxHeight: '100px' }} navbarScroll>
              <Nav.Link href="/customerhome">
                <BsFillHouseDoorFill /> Home
              </Nav.Link>
              <NavDropdown title={<><BsPinMapFill /> Location</>} id="navbarScrollingDropdown">
                <NavDropdown.Item disabled>
                  <span>Your Location is {customerData?.location}</span>
                  <br />
                  <span style={{ fontSize: '12px' }}>We're glad to have you here!</span>
                </NavDropdown.Item>
                <NavDropdown.Divider />
              </NavDropdown>
              <Nav.Link href="/browserestaurants">
                <IoRestaurant /> Browse Restaurants
              </Nav.Link>
              
            </Nav>
           
            <Nav className="ms-auto"> {/* Use ms-auto for left margin on the right-aligned items */}
              <Nav.Link href="/cart">
                <BsCartFill /> Cart
              </Nav.Link>
              <NavDropdown title={<><BsFillPersonFill /> Profile</>} id="navbarScrollingDropdown" className="profile-dropdown-left">
                <NavDropdown.Item href="/profile">View Profile</NavDropdown.Item>
                <NavDropdown.Item href="/forgotpassword">Change Password</NavDropdown.Item>
                <NavDropdown.Item href="/vieworders">Orders</NavDropdown.Item>
                <NavDropdown.Item>
                  <button className="logoutButton" onClick={handleLogout}>
                    Logout
                  </button>
                </NavDropdown.Item>
                <NavDropdown.Divider />
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Routes>
        <Route path="/customerhome" element={<CustomerHome />} />
        <Route path="/" element={<CustomerHome />} />
        <Route path="/browserestaurants" element={<BrowseRestaurants />} />
        <Route path="/menu/:restaurantname" element={<Menu />} />
        <Route path="/success" element={<Success/>} />
        <Route path="/forgotpassword" element={<ForgotPassword/>} />
        <Route path="/failure" element={<Failure/>} />
        <Route path="/updateprofile" element={<UpdateProfile/>} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/vieworders" element={<ViewOrders/>}/>
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </div>
  );
}
