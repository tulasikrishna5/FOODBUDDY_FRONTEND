
import Container from 'react-bootstrap/Container';

import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { BsFillHouseFill, BsFillPeopleFill } from "react-icons/bs";
import { GrRestaurant } from "react-icons/gr";
import { Route, Routes, useNavigate } from 'react-router-dom';
import AdminHome from './AdminHome';
import ViewCustomers from './ViewCustomers';
import DeleteCustomer from './DeleteCustomer';
import ViewRestaurantOwners from './ViewRestaurantOwner';
import DeleteRestaurantOwner from './DeleteRestaurantOwner';
import AddRestaurantOwners from './AddRestaurantOwners';
export default function AdminNavBar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('isAdminLoggedIn');
    localStorage.removeItem('admin');
    navigate('/adminlogin');
    window.location.reload()
  };

  return (
    <div>
        <Navbar expand="lg" className="bg-orange navbar-custom sticky-top">
      <Container fluid>
        <Navbar.Brand href="#">FoodBuddy</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="mx-auto my-2 my-lg-0" 
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            <Nav.Link href="/adminhome">
              <BsFillHouseFill /> Home
            </Nav.Link>
            <div className="mx-2"></div>
            
            <NavDropdown title={<> <BsFillPeopleFill />
 Customers</>}> 
              <NavDropdown.Item href="/viewcustomer">View Customer</NavDropdown.Item>
              
	     <NavDropdown.Item href="/deletecustomer">Delete Customer</NavDropdown.Item>
            </NavDropdown>

             <div className="mx-2"></div>
           
            <NavDropdown title={<><GrRestaurant />  Restaurant Owners</>}> 
              <NavDropdown.Item href="/viewrestaurantowner">View Restaurant Owners</NavDropdown.Item>
              <NavDropdown.Item href="/addrestaurantowner">Add Restaurant Owners</NavDropdown.Item>
	     <NavDropdown.Item href="/deleterestaurantowner">Delete Restaurant Owner</NavDropdown.Item>
            </NavDropdown>
          </Nav>

          <div className="d-flex ms-auto"> 
          <li><button className="logoutButton" onClick={handleLogout}>Logout</button></li>
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    <Routes>
    <Route path='/adminhome' element={<AdminHome/>} exact/>
    <Route path='/viewcustomer' element={<ViewCustomers/>} exact/>
        <Route path='/deletecustomer' element={<DeleteCustomer/>} exact/>
        <Route path='/viewrestaurantowner' element={<ViewRestaurantOwners/>} exact/>
        <Route path='/deleterestaurantowner' element={<DeleteRestaurantOwner/>} exact/>
        <Route path='/addrestaurantowner' element={<AddRestaurantOwners/>} exact/>

    </Routes>

    </div> 
  )
}
