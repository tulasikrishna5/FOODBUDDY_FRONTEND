import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BsFillHouseFill, BsFillInfoSquareFill, BsQuestionSquareFill, BsBarChartSteps } from "react-icons/bs";
import './mainnavbar.css'; 
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Route, Routes } from 'react-router-dom';
import Home from './Home';
import AboutUs from './AboutUs';
import HowItWorks from './HowItWorks';
import FAQ from './FAQ';
import AdminLogin from '../admin/AdminLogin';
import CustomerLogin from '../customer/CustomerLogin';
import RestaurantOwnerLogin from '../restaurantowner/RestaurantOwnerLogin';
import RestaurantOwnerRegistration from './../restaurantowner/RestaurantOwnerRegistration';
import CustomerRegistration from './../customer/CustomerRegistration';

export default function MainNavBar({ onAdminLogin, onCustomerLogin, onRestaurantOwnerLogin }) {
  const navigate = useNavigate();
  const [showLoginDropdown, setShowLoginDropdown] = useState(false);
  const dropdownRef = useRef(null);

  const toggleLoginDropdown = () => {
    setShowLoginDropdown(!showLoginDropdown);
    // Automatically close the dropdown after 5 seconds
    if (!showLoginDropdown) {
      setTimeout(() => {
        setShowLoginDropdown(false);
      }, 5000);
    }
  };

  const handleMouseEnter = () => {
    if (!showLoginDropdown) {
      setShowLoginDropdown(true);
    }
  };

  const handleMouseLeave = (event) => {
    const { relatedTarget } = event;
    if (dropdownRef.current && !dropdownRef.current.contains(relatedTarget)) {
      setShowLoginDropdown(false);
    }
  };

  const scrollToSection = (sectionId) => {
    navigate('/home');

    setTimeout(() => {
      const section = document.getElementById(sectionId);
      if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  const handleHowItWorksClick = () => {
    scrollToSection('how');
  };

  const handleAboutClick = () => {
    scrollToSection('about');
  };

  const handleFaqClick = () => {
    scrollToSection('faq');
  };

  return (
    <div>
      <Navbar expand="lg" className="bg-orange navbar-custom sticky-top">
        <Container fluid>
          <Navbar.Brand href="/">Food Buddy</Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav className="my-2 my-lg-0" style={{ maxHeight: '100px' }} navbarScroll>
              {/* Empty Nav component */}
            </Nav>
            <Nav className="mx-auto">
              <Nav.Link href="/home" className="nav-link-large">
                <BsFillHouseFill /> Home
              </Nav.Link>
              <Nav.Link onClick={handleHowItWorksClick} className="nav-link-large">
                <BsBarChartSteps /> How It Works
              </Nav.Link>
              <Nav.Link onClick={handleAboutClick} className="nav-link-large">
                <BsFillInfoSquareFill /> About
              </Nav.Link>
              <Nav.Link onClick={handleFaqClick} className="nav-link-large">
                <BsQuestionSquareFill /> FAQ
              </Nav.Link>
            </Nav>
            <NavDropdown
              title="Login"
              id="navbarScrollingDropdown"
              className="d-flex"
              show={showLoginDropdown}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              style={{ position: 'absolute', left: 'calc(100% - 200px)' }}
              ref={dropdownRef}
              onClick={toggleLoginDropdown}
            >
              <NavDropdown.Item href="/adminlogin">Admin Login</NavDropdown.Item>
              <NavDropdown.Item href="/restaurantlogin">Restaurant Login</NavDropdown.Item>
              <NavDropdown.Item href="/customerlogin">Customer Login</NavDropdown.Item>
              <NavDropdown.Divider />
            </NavDropdown>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Routes>
        <Route path="/" element={<Home />} exact />
        <Route path="/home" element={<Home />} exact />
        <Route path="/about" element={<AboutUs />} exact />
        <Route path="/howitworks" element={<HowItWorks />} exact />
        <Route path="/restaurantownerregistration" element={<RestaurantOwnerRegistration />} exact />
        <Route path="/customerregistration" element={<CustomerRegistration />} exact />
        <Route path="/adminlogin" element={<AdminLogin onAdminLogin={onAdminLogin} />} exact />
        <Route path="/customerlogin" element={<CustomerLogin onCustomerLogin={onCustomerLogin} />} exact />
        <Route path="/restaurantlogin" element={<RestaurantOwnerLogin onRestaurantOwnerLogin={onRestaurantOwnerLogin} />} exact />
        <Route path="/faq" element={<FAQ />} exact />
      </Routes>
    </div>
  );
}
