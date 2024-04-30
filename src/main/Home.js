import React from 'react';
import styles from './Home.module.css'; 
import Carousel from 'react-bootstrap/Carousel';
import 'bootstrap/dist/css/bootstrap.min.css';


import Carousel1 from './images/bread.jpg'; 
import Carousel2 from './images/set.jpg'; 
import Carousel3 from './images/Caraousel3.jpg'; 
import andhra from './images/andhra.jpg';
import biryani from './images/biryani.jpg';
import chinese from './images/chinese.jpg';
import samosa from './images/samosa.jpg';
import burger from './images/burger.jpg';
import juice from './images/juice.jpg';

import AboutUs from './AboutUs';
import HowItWorks from './HowItWorks';
import FAQ from './FAQ';

export default function Home() {
    return (
        <div>
           
            <Carousel>
                <Carousel.Item interval={1000}>
                    <img
                        className="d-block w-100"
                        src={Carousel1}
                        alt="First slide"
                        style={{ maxHeight: '400px' }} 
                    />
                    <Carousel.Caption>
                        {/* <p style={{ fontSize: '18px', color: 'black' }}>Take your taste buds for a ride</p> */}
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item interval={500}>
                    <img
                        className="d-block w-100"
                        src={Carousel2}
                        alt="Second slide"
                        style={{ maxHeight: '400px' }} 
                    />
                    <Carousel.Caption>
                        {/* <p style={{ fontSize: '18px', color: 'black' }}>All you need is FOOD</p>
                        <p style={{ fontSize: '18px', color: 'black' }}>Walking to your doorstep!!</p> */}
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src={Carousel3}
                        alt="Third slide"
                        style={{ maxHeight: '400px' }} 
                    />
                    <Carousel.Caption>
                        {/* <p style={{ fontSize: '18px', color: 'black' }}>You can't make everyone happy, but Indian delights can.</p> */}
                    </Carousel.Caption>
                </Carousel.Item>
            </Carousel>
            <section id={styles.one}> 
                <div className={styles.container}> 
                    <div className={styles.box1}> 
                        <h2>Looking To Savour The</h2>
                        <h2>Flavours Of The City</h2>
                        <h3>Browse through a variety of cuisines</h3>

                       
                    </div>

                    <div className={styles.box2}> 
                        <img src='robot.png' alt="A robot chef holding a cake" width="200" height="200" id={styles.robot} /> {/* Use CSS module class names */}
                    </div>
                </div>
                <h1 align="center" style={{ fontFamily: "sans-serif", color: "#FF6347", fontWeight: "bold", fontSize: "35px", textDecoration: "underline" }}>Categories</h1>
                <br/>
                <div className={styles.menu}> 
                    <div className={styles.card}> 
                        <h3>Andhra Food</h3>
                        <img src={andhra} alt='breakfast' width="50%" />
                    </div>
                    <div className={styles.card}> 
                        <h3>Beverages</h3>
                        <img src={juice} alt='lunch' width="50%" />
                    </div>
                    <div className={styles.card}> 
                        <h3>Snacks</h3>
                        <img src={samosa} alt='lunch' width="50%" />
                    </div>
                    <div className={styles.card}> 
                        <h3>Fast Food</h3>
                        <img src={burger} alt='lunch' width="50%" />
                    </div>
                    <div className={styles.card}> 
                        <h3>Biryani</h3>
                        <img src={biryani} alt='dinner' width="50%" />
                    </div>
                    <div className={styles.card}> 
                        <h3>Chinese</h3>
                        <img src={chinese} alt='dinner' width="50%" />
                    </div>
                </div>
            </section>
            <br/>
            <br/>
            
            
            <section id="how">
            <br/>
            <br/>
            <br/><br/>
                <h1 align="center" style={{ fontFamily: "sans-serif", color: "#FF6347", fontWeight: "bold", fontSize: "35px", textDecoration: "underline" }}>How It Works</h1>
                <HowItWorks/>
            </section>
            <br/>
            <br/><br/><br/>
            <section id="about">
            <br/>
            <br/><br/><br/>
                <h1 align="center" style={{ fontFamily: "sans-serif", color: "#FF6347", fontWeight: "bold", fontSize: "35px", textDecoration: "underline" }}>About Us</h1>
                <AboutUs/>
            </section>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/><br/>
            <section id="faq">
          
                <h1 align="center" style={{ fontFamily: "sans-serif", color: "#FF6347", fontWeight: "bold", fontSize: "35px", textDecoration: "underline" }}>Frequently Asked Questions</h1>
                <FAQ/>
            </section>
            <section id={styles.end}> 
                <div className={styles.bar}> 
                    <div><h4>FoodBuddy</h4></div>
                    <div><a href='/'>Follow us On Instagram</a></div>
                    <div><a href='/'>FaceBook</a></div>
                    <div><h4><strong>&copy;FoodBuddyLimited</strong></h4></div>
                </div>
            </section>
        </div>
    );
}
