import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

// import CustomerNavBar from './CustomerNavBar';

const featuredRestaurants = [
  { id: 1, name: 'RoseMarys', image: "https://media.architecturaldigest.com/photos/60e33c2983afe4fd18137304/master/w_1600%2Cc_limit/rosemarys_0421_lizclayman_211.jpg", description: 'THE ULTIMATE DESTINATION FOR BBQ LOVERS.', popularDishes: ['Smoked Ribs', 'Grilled Chicken Skewers', 'Brisket Platter'] },
  { id: 2, name: "Chettinad", image: "https://media-cdn.tripadvisor.com/media/photo-m/1280/15/4e/b6/00/restaurant-front.jpg", description: 'Authentic cuisine from around the world.', popularDishes: ['Pad Thai', 'Sushi Platter', 'Chicken Tikka Masala'] },
  { id: 3, name: 'SweetGreen', image: "https://images.wondershare.com/edrawmind/articles2023/restaurant-organizational-chart/sweetgreen-restaurant.jpg", description: 'Fine dining experience with a view.', popularDishes: ['Lobster Thermidor', 'Filet Mignon', 'Truffle Risotto'] },
];

const popularDishes = [
  { id: 1, name: 'French Fries',image:"https://www.recipetineats.com/wp-content/uploads/2022/09/Fries-with-rosemary-salt_1.jpg", description: 'Fried to Perfection' },
  { id: 2, name: 'Onion dosa',image:"https://media-cdn.tripadvisor.com/media/photo-s/1c/b1/58/37/onion-dosa.jpg", description: 'A dosa with the fragrance of sauted Onions' },
  { id: 3, name: 'Roasted Chicken',image:"https://ohsweetbasil.com/wp-content/uploads/honey-roasted-chicken-recipe-16.jpg", description: 'A dish roasted for perfect crispiness' },
];

export default function CustomerHome() {
  const [customerData, setcustomerData] = useState(null);

  useEffect(() => {
    const storedcustomerData = localStorage.getItem('customer');
    if (storedcustomerData) {
      const parsedcustomerData = JSON.parse(storedcustomerData);
      setcustomerData(parsedcustomerData);
    }
  }, []);

  return (
    <div>
      {customerData && (
        <div>
          <h4>Welcome {customerData.fullname}</h4>
        </div>
      )}

      <br/><br/>
      <h1 align="center" style={{ fontFamily: "sans-serif", color: "#FF6347", fontWeight: "bold", fontSize: "35px", textDecoration: "underline" }}>Top 3 Restaurants</h1>
      <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap' }}>
        {featuredRestaurants.map(restaurant => (
          <div key={restaurant.id} style={{ margin: '20px', width: '300px', boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)', borderRadius: '10px', padding: '20px', textAlign: 'center' }}>
            <img src={restaurant.image} alt={restaurant.name} style={{ width: '100%', height: '200px', objectFit: 'cover', borderRadius: '10px 10px 0 0' }} />
            <h2 style={{ fontSize: '1.5rem', margin: '10px 0' }}>{restaurant.name}</h2>
            <p style={{ fontSize: '1rem', margin: '0' }}>{restaurant.description}</p>
          </div>
        ))}
      </div>
      
      <div style={{ marginTop: '40px', padding: '20px', backgroundColor: '#f9f9f9', borderRadius: '10px', textAlign: 'center' }}>
        <h2 style={{ fontFamily: "sans-serif", color: "#FF6347", fontWeight: "bold", fontSize: "24px", textDecoration: "underline" }}>Popular Dishes in Your City</h2>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
          {popularDishes.map(dish => (
            <div key={dish.id} style={{ marginBottom: '20px', padding: '15px', border: '1px solid #ccc', borderRadius: '10px', backgroundColor: '#fff' }}>
              <img src={dish.image} alt={dish.name} style={{ width: '100%', height: '200px', objectFit: 'cover', borderRadius: '10px 10px 0 0' }} />
              <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '10px' }}>{dish.name}</h3>
              <p style={{ fontSize: '1.1rem', margin: '0' }}>{dish.description}</p>
            </div>
          ))}
        </div>
      </div>

      <div style={{ textAlign: 'center', marginTop: '20px' }}>
        <Link to="/browserestaurants" style={{ textDecoration: 'none', backgroundColor: '#FF6347', color: 'white', padding: '10px 20px', borderRadius: '5px', fontSize: '18px' }}>Show More</Link>
      </div>
    </div>
  );
}
