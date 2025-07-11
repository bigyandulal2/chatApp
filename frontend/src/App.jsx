import React from "react";
import "./App.css";
import Home from "./pages/Home";

export default function App() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-900 to-gray-800 text-gray-100">
      <Home />
    </div>
  );
}
