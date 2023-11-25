import React from "react";
import NavBar from "../Header/NavBar";
import HeroSection from "./Hero section/HeroSection";
import AboutUs from "./About Us/AboutUs";
import PhotoGraphy from "./PhotoGraphy/PhotoGraphy";
import Footer from "../Footer/Footer";
import CinematoHome from "./Cinematography/CinematoHome";
import RecentWorks from "./Recent works/RecentWorks";
import PortfolioHome from "./Portfolios/PortfolioHome";
import Members from "./Members/Members";
import WhyUs from "./Why Us/WhyUs";
import Cta from "./CTA/Cta";
import Events from "./Events/Events";
import "./homepage.css";
import MydayHome from "./MydayHome";
import UserSection from "./UserSection";
import Developer from "./Developer";
import ClinetsReview from "./Clints Review/ClinetsReview";

const HomePageComp = () => {
  return (
    <main className="">
      <div className="">
        <NavBar />
      </div>

      {/* for home page */}
      <section>
        <HeroSection />
        <AboutUs />
        <MydayHome />
        <UserSection />
        <PhotoGraphy />
        <CinematoHome />
        <RecentWorks />
        <PortfolioHome />
        <ClinetsReview />
        <Members />
        <Events />
        <WhyUs />
        <Cta />
        <Developer />
      </section>
      <div className="">
        <Footer />
      </div>
    </main>
  );
};

export default HomePageComp;
