import React from "react";

const TestimonialSection = () => {
  return (
    <section className="bg-white py-10">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">What Our Clients Say</h2>
        <div className="flex justify-center space-x-10">
          <div className="max-w-xs">
            <img src="/images/visitor/testimonial1.png" alt="Client 1" className="rounded-full mb-4 w-24 h-24 mx-auto" />
            <p className="text-gray-600">"This service has been a game changer for our business."</p>
            <p className="text-gray-800 font-bold mt-2">- Client 1</p>
          </div>
          <div className="max-w-xs">
            <img src="/images/visitor/testimonial2.png" alt="Client 2" className="rounded-full mb-4 w-24 h-24 mx-auto" />
            <p className="text-gray-600">"We have seen significant improvements since using this service."</p>
            <p className="text-gray-800 font-bold mt-2">- Client 2</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;
