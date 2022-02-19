import React, { useEffect } from 'react'
import "../footer.css"
import covid_tit from "../images/logo.png";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faInstagram , faLinkedinIn, faTwitter } from "@fortawesome/free-brands-svg-icons";
import AOS from 'aos';
import 'aos/dist/aos.css';
import { Link } from 'react-router-dom';

const Footer = () => {
    useEffect(()=>{
        AOS.init({
            duration : 800,
            offset:-10
        });

    },[])
    return (
        <div id="Footer">
        <div className="Foot_container">
            <div id="Foot_box1" className="Foot_boxs">
                <div className="logo">
                    <h1 data-aos="zoom-in" data-aos-delay="200"><img title="covid Logo" src={covid_tit} alt="Covid Logo" /><span>Book 2 Trees</span></h1>
                    <p data-aos="fade-right" data-aos-delay="200"><em>An Initiative for a Better Tomorrow…!!!</em></p>

                    <p data-aos="fade-left" data-aos-delay="300">Our #1 priority is nature. Which means we take every measure to make this world safe, clean and better for everyone. We do this by planting trees and saving paper.</p>
                </div>
            </div>
            <div id="Foot_box2" className="Foot_boxs" >
                <h3 data-aos="zoom-in" data-aos-delay="100">QUICK LINK</h3>
                <ul>
                    <li data-aos="fade-up" ><Link to="/Pending">PROFILE</Link></li>
                    <li data-aos="fade-up" data-aos-delay="100"><Link to="/Pending">SETTINGS</Link></li>
                    <li data-aos="fade-up" data-aos-delay="200"><Link to="/Pending">NOTIFICATION</Link></li>
                    <li data-aos="fade-up" data-aos-delay="300"><Link to="/Pending">PENDING</Link></li>
                    <li data-aos="fade-up" data-aos-delay="400"><Link to="/Published">PUBLISHED</Link></li>

                </ul>
            </div>
            {/* <div id="Foot_box3" className="Foot_boxs" data-aos="fade-up" data-aos-delay="300">
                <h4>HELPFULL LINK</h4>
                <ul>
                    <li><a href="#">Healthcare Professionals</a></li>
                    <li><a href="#">Healthcare Facilities</a></li>
                    <li><a href="#">Medical Conditions</a></li>
                    <li><a href="#">Repare your Family</a></li>
                </ul>
            </div> */}
            <div id="Foot_box4" className="Foot_boxs" >
                <h3 data-aos="zoom-in" data-aos-delay="100">Follow Us</h3>
                <ul>
                    <li data-aos="fade-up" ><a href="#"><FontAwesomeIcon icon ={faFacebookF}></FontAwesomeIcon></a></li>
                    <li data-aos="fade-up" data-aos-delay="100"><a href="#"><FontAwesomeIcon icon ={faInstagram}></FontAwesomeIcon></a></li>
                    <li data-aos="fade-up" data-aos-delay="200"><a href="#"><FontAwesomeIcon icon ={faLinkedinIn}></FontAwesomeIcon></a></li>
                    <li data-aos="fade-up" data-aos-delay="300"><a href="#"><FontAwesomeIcon icon ={faTwitter}></FontAwesomeIcon></a></li>

                </ul>
            </div>
        </div>
    </div>
    )
}

export default Footer
