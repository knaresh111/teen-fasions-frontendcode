import React, { useState, useEffect } from "react";
import Header from '../header/header';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import backgroundImage from '../../assets/images/home-4.jpg';
import TrendingProducts from "../trendingproducts/trending";
import SimpleFooter from '../Footers/SimpleFooters';
import WhatsAppButton from "../whatsapp/whatsapp";
import SalesAndScrollingText from "../offer/offer";
import About from '../about/about';
import './landing.css';
import { useNavigate } from "react-router-dom";

// HomePage Component
const HomePage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [scrollY, setScrollY] = useState(0);
  const navigate = useNavigate();

  // Handle input change
  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // Handle search button click
  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/search?keyword=${encodeURIComponent(searchTerm)}`);
  };

  // Handle scroll to create parallax effect
  const handleScroll = () => {
    setScrollY(window.scrollY);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <Header />
      <section
        className="home-section"
        id="home"
        style={{
          background: `url(${backgroundImage}) no-repeat center`,
          backgroundSize: 'cover',
          backgroundAttachment: 'fixed',
          backgroundPositionY: `${scrollY * 0.5}px`, // Adjust the background scroll speed
          height: '500px',
          width: '100%',
          marginTop: '-20px'
        }}
      >
        <div className="content">
          <form className="search-form" onSubmit={handleSearch}>
            <input
              type="text"
              className="search-input"
              placeholder="Search for fashion..."
              value={searchTerm}
              onChange={handleInputChange}
            />
            <button className="search-btn">
              <FontAwesomeIcon icon={faSearch} /> Search
            </button>
          </form>
          <h3>TEEN FASHION</h3>
          <p>The Fashion Glossary | A-Z Industry Words</p>
          <a href="#" className="btn">
            <span className="text text-1">SHOP NOW</span>
          </a>
        </div>
      </section>
      <WhatsAppButton />
      <TrendingProducts />
      <TrendingProducts />
      <SalesAndScrollingText />
      <TrendingProducts />
      <About />
      <SimpleFooter />
    </>
  );
};

export default HomePage;
