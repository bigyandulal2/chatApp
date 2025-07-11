import React, { useEffect, useState } from "react";
import NavBar from "../section/home/NavBar";
import Hero from "../section/home/Hero";
import Features from "../section/home/Features";
import CTA from "../section/home/CTA";
import Footer from "../section/home/Footer";
export default function Home() {
  const [scrolled, setScrolled] = useState(false);

  // Change navbar on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <NavBar scrolled={scrolled} />
      <Hero />
      <Features />
      <CTA />
      <Footer />
    </>
  );
}
