import React, { useEffect } from "react";
import Footer from "./Footer";
import Hero from "./Hero";
import Navbar from "./Navbar";
import Recommend from "./Recommend";
import ScrollToTop from "./ScrollToTop";
import Services from "./Services";
import Testimonials from "./Testimonials";
import scrollreveal from "scrollreveal";
import './home.css'

function Home() {
    useEffect(() => {
        const sr = scrollreveal({
          origin: "top",
          distance: "80px",
          duration: 2000,
          reset: true,
        });
        sr.reveal(
          `
            nav,
            #hero,
            #services,
            #recommend,
            #testimonials,
            footer
            `,
          {
            opacity: 0,
            interval: 300,
          }
        );
      }, []);
  return (
    <div className="homehtml">
    <div className="homecontainer">
    <div className="homebody">
      <ScrollToTop />
      <Navbar />
      <Hero />
      <Services />
      <Recommend />
      <Testimonials />
      <Footer />
    </div>
    </div>
    </div>
  )
}

export default Home