import React, { useEffect, useState } from "react";
import Footer from "./Footer";
import NavBar from "./Navbar";
import Recommend from "./Recommend";
import ScrollToTop from "./ScrollToTop";
import Services from "./Services";
import Testimonials from "./Testimonials";
import Hero from './Hero'

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
    <div>
      <ScrollToTop />
      <NavBar />
      <Hero />
      <Services />
      <Recommend />
      <Testimonials />
      <Footer />
    </div>
  )
}

export default Home