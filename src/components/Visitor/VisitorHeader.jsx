import React from "react";

const VisitorHeader = () => {
  return (
    <header className="bg-white shadow-md py-4">
      <div className="container mx-auto flex justify-between items-center">
        <img src="/images/visitor/logo.png" alt="Logo" className="h-10" />
        <nav className="space-x-4">
          <a href="#" className="text-gray-600 hover:text-gray-900">Home</a>
          <a href="#" className="text-gray-600 hover:text-gray-900">About</a>
          <a href="#" className="text-gray-600 hover:text-gray-900">Services</a>
          <a href="#" className="text-gray-600 hover:text-gray-900">Contact</a>
        </nav>
      </div>
    </header>
  );
};

export default VisitorHeader;
