import React from "react";
import VisitorHeader from "./VisitorHeader";
import TestimonialSection from "./TestimonialSection";

const VisitorLanding = () => {
  return (
    <div>
      <VisitorHeader />
      <main className="bg-gray-100 py-10">
        <div className="container mx-auto flex flex-col items-center text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Welcome to Our Service</h1>
          <p className="text-gray-600 mb-8">We provide the best solutions for your business needs.</p>
          <img src="/images/visitor/hero-image.png" alt="Hero" className="w-3/4 max-w-lg mb-10" />
          <button className="bg-blue-500 text-white px-6 py-3 rounded-full hover:bg-blue-700 transition duration-300">Get Started</button>
        </div>
      </main>
      <TestimonialSection />
    </div>
  );
};

export default VisitorLanding;
