
import { BrowserRouter} from 'react-router-dom';
import MainNavBar from './main/MainNavBar';

import { useEffect, useState } from 'react';
import AdminNavBar from './admin/AdminNavBar';
import CustomerNavBar from './customer/CustomerNavBar';
import RestaurantOwnerNavBar from './restaurantowner/RestaurantOwnerNavBar';



export default function App(){
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [isCustomerLoggedIn, setIsCustomerLoggedIn] = useState(false);
  const [isRestaurantOwnerLoggedIn, setIsRestaurantOwnerLoggedIn] = useState(false);

  useEffect(() => {
    const adminLoggedIn = localStorage.getItem('isAdminLoggedIn') === 'true';
    const customerLoggedIn = localStorage.getItem('isCustomerLoggedIn') === 'true';
    const restaurantownerLoggedIn = localStorage.getItem('isRestaurantOwnerLoggedIn') === 'true';
    
    setIsAdminLoggedIn(adminLoggedIn);
    setIsCustomerLoggedIn(customerLoggedIn);
    setIsRestaurantOwnerLoggedIn(restaurantownerLoggedIn);
  }, []);

  const onAdminLogin = () => {
    localStorage.setItem('isAdminLoggedIn', 'true');
    setIsAdminLoggedIn(true);
  };

  const onCustomerLogin = () => {
    localStorage.setItem('isCustomerLoggedIn', 'true');
    setIsCustomerLoggedIn(true);
  };

  const onRestaurantOwnerLogin = () => {
    localStorage.setItem('isRestaurantOwnerLoggedIn', 'true');
    setIsRestaurantOwnerLoggedIn(true);
  };
  return (
    <div className="App">
      <BrowserRouter>
      {isAdminLoggedIn ? (
          <AdminNavBar />
        ) : isCustomerLoggedIn ? (
          <CustomerNavBar />
        ) : isRestaurantOwnerLoggedIn ? (
          <RestaurantOwnerNavBar />
        ) : (
          <MainNavBar
            onAdminLogin={onAdminLogin}
            onCustomerLogin={onCustomerLogin}
            onRestaurantOwnerLogin={onRestaurantOwnerLogin}
          />
        )}
     
      </BrowserRouter>
      
    </div>
  );
}


