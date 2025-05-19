import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Navbar from "./components/Navbar/Navbar";
import Hero from "./components/Hero/Hero";
import Features from "./components/feature/Feature";
import CTA from "./components/CTA/CTA";
import Footer from "./components/Footer/Footer";
import "./App.css";

export default function App() {
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
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-900 to-gray-800 text-gray-100">
      <Navbar scrolled={scrolled} />
      <Hero />
      <Features />
      <CTA />
      <Footer />
    </div>
  );
}
