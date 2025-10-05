// Home.js
import React from "react";

import About from "../components/About";
// import Announcements from "../components/Announcements";
import EventHighlights from "../components/EventHighlights";
import GallerySlider from "../components/Gallery";
import Footer from "../components/footer";
import Hero from "../components/Hero";
import Sponsors from "../components/Sponsors";
import BoardSection from "../components/BoardMembers";



const Home = () => {
  return (
    <>
      {/* Hero Section */}
      <section className=" w-full h-screen relative">
        <Hero />
      </section>
<section>     <Sponsors />
</section>
 
    <>
    <BoardSection/>
    </>
      <section>
        <About />
      </section>

      {/* Announcements Section */}
      {/* <section>
        <Announcements />
      </section> */}

      {/* Event Highlights Section */}
      <section className="relative w-full">
        <EventHighlights />
      </section>

      {/* Gallery Section */}
      <section>
        <GallerySlider />
      </section>

      {/* Footer Section */}
      <section>
        <Footer />
      </section>
   </>

  );
};

export default Home;
