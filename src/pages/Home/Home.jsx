import React, { useEffect, useState } from "react";
import Footer from "./Footer";
import HeroImage from "./HeroSection";
import NavBar from "./NavBarRes";
import Recommend from "./Recommend";
import ScrollToTop from "./ScrollToTop";
import Services from "./Services";
import Testimonials from "./Testimonials";
import scrollreveal from "scrollreveal";
import './home.css'
import RecommendEvent from "./RecommendEvent";
import RecommendBus from "./RecommendBus";
import axios from "axios";

function Home() {
    // useEffect(() => {
    //     const sr = scrollreveal({
    //       origin: "top",
    //       distance: "80px",
    //       duration: 2000,
    //       reset: true,
    //     });
    //     sr.reveal(
    //       `
    //         nav,
    //         #hero,
    //         #services,
    //         #recommend,
    //         #testimonials,
    //         footer
    //         `,
    //       {
    //         opacity: 0,
    //         interval: 300,
    //       }
    //     );
    //   }, []);

    
  return (
    <div className="homehtml">
    <div className="homecontainer">
    <div className="homebody">
      <ScrollToTop />
      <HeroImage />
      <Services />
      <RecommendBus />
      <Recommend />
      <RecommendEvent />
      <Testimonials />
      <Footer />
    </div>
    </div>
    </div>
  )
}

export default Home