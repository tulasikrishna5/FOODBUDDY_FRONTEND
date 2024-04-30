import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { BsFillHouseFill, BsReverseLayoutTextWindowReverse, BsFillPersonFill } from 'react-icons/bs';
import { Route, Routes, useNavigate } from 'react-router-dom';
import RestaurantHome from './RestaurantHome';
import AddMenu from './AddMenu';
import Profile from './Profile';
import ViewMenu from './ViewMenu';
import ForgotPassword from './ForgotPassword';
import './RestaurantOwnerNavBar.css'; // Import CSS file

export default function RestaurantOwnerNavBar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('isRestaurantOwnerLoggedIn');
    localStorage.removeItem('restaurantOwner');
    navigate('/restaurantlogin');
    window.location.reload();
  };

  return (
    <div>
      <Navbar expand="lg" className="bg-orange navbar-custom sticky-top">
        <Container fluid>
          <Navbar.Brand href="#">FoodBuddy</Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav className="mx-auto" style={{ maxHeight: '100px' }} navbarScroll>
              <Nav.Link href="/restaurantownerhome">
                <BsFillHouseFill /> Home
              </Nav.Link>
              <NavDropdown title={<><BsReverseLayoutTextWindowReverse /> Menu</>}>
                <NavDropdown.Item href="/viewmenu">View Menu</NavDropdown.Item>
                <NavDropdown.Item href="/addmenu">Add Menu Item</NavDropdown.Item>
              </NavDropdown>
            </Nav>

            <Nav className="ms-auto pe-5">
              <NavDropdown title={<><BsFillPersonFill /> Profile</>} id="navbarScrollingDropdown">
                <NavDropdown.Item href="/restaurantprofile">View Profile</NavDropdown.Item>
                <NavDropdown.Item href="/forgotpassword">Change Password</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item>
                  <button className="logoutButton" onClick={handleLogout}>Logout</button>
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Routes>
        <Route path="/" element={<RestaurantHome />} exact />
        <Route path="/restaurantownerhome" element={<RestaurantHome />} exact />
        <Route path="/addmenu" element={<AddMenu />} exact />
        <Route path="/forgotpassword" element={<ForgotPassword />} />
        <Route path="/viewmenu" element={<ViewMenu />} exact />
        <Route path="/restaurantprofile" element={<Profile />} exact />
      </Routes>
    </div>
  );
}
