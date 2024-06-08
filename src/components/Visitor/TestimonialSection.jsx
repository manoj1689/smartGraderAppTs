import React from "react";

function TestimonialSection() {
  return (
    <div className="testimonial flex flex-col items-center mt-44 max-md:mt-10">
      <div className="testi_title flex flex-col items-center justify-center w-[100%]">
        <div className="self-start mt-1.5 ml-6 text-4xl text-slate-800 max-md:mt-10 max-md:ml-2.5">
          Testimonial
        </div>
      </div>
      <div className="flex flex-col justify-center mt-10 max-md:mt-6">
        <div className="testimonial_data flex flex-row justify-center items-center max-md:flex-col">
          <div className="testimonial_content flex flex-row flex-wrap justify-start items-center w-[25%] gap-4 max-md:flex-col max-md:w-full max-md:gap-1">
            <img
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/12063b80bb421f02dbe79c61b3b07cc9a5d44c370d2b6e8a84b87260086df271?apiKey=64ac1a7b85e84629af509d56edee2526&"
              alt="Testimonial 1"
              className="aspect-square w-[85px] rounded-full max-md:w-[14vw]"
            />
            <div className="test_text ml-3 text-lg font-medium text-slate-800 max-md:w-[80%]">
              “Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
              mattis ullamcorper purus ac sollicitudin. Nulla sollicitudi.”
              <div className="mt-3 text-sm font-light text-neutral-500">
                Dr. Amar kumar, Senior consultant
              </div>
            </div>
          </div>
          <div className="testimonial_content flex flex-row flex-wrap justify-start items-center w-[25%] gap-4 ml-10 max-md:flex-col max-md:w-full max-md:gap-1 max-md:ml-0">
            <img
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/624e9fc62d3443e9a7e198c437ce2a80d25c17812e56b0133508d7c2430abde5?apiKey=64ac1a7b85e84629af509d56edee2526&"
              alt="Testimonial 2"
              className="aspect-square w-[85px] rounded-full max-md:w-[14vw]"
            />
            <div className="test_text ml-3 text-lg font-medium text-slate-800 max-md:w-[80%]">
              “Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
              mattis ullamcorper purus ac sollicitudin. Nulla sollicitudi.”
              <div className="mt-3 text-sm font-light text-neutral-500">
                Dr. Amar kumar, Senior consultant
              </div>
            </div>
          </div>
          <div className="testimonial_content flex flex-row flex-wrap justify-start items-center w-[25%] gap-4 ml-10 max-md:flex-col max-md:w-full max-md:gap-1 max-md:ml-0">
            <img
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/16a4f1c27f637bfdbd8896c8dd0dc7a0738d708d541d2b050d8a96195d5f9fc7?apiKey=64ac1a7b85e84629af509d56edee2526&"
              alt="Testimonial 3"
              className="aspect-square w-[85px] rounded-full max-md:w-[14vw]"
            />
            <div className="test_text ml-3 text-lg font-medium text-slate-800 max-md:w-[80%]">
              “Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
              mattis ullamcorper purus ac sollicitudin. Nulla sollicitudi.”
              <div className="mt-3 text-sm font-light text-neutral-500">
                Dr. Amar kumar, Senior consultant
              </div>
            </div>
          </div>
          <div className="testimonial_content flex flex-row flex-wrap justify-start items-center w-[25%] gap-4 ml-10 max-md:flex-col max-md:w-full max-md:gap-1 max-md:ml-0">
            <img
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/b6e2f4c99987118465f54739f71544986b55f7d36df037b4e4f1530f10c34eaf?apiKey=64ac1a7b85e84629af509d56edee2526&"
              alt="Testimonial 4"
              className="aspect-square w-[85px] rounded-full max-md:w-[14vw]"
            />
            <div className="test_text ml-3 text-lg font-medium text-slate-800 max-md:w-[80%]">
              “Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
              mattis ullamcorper purus ac sollicitudin. Nulla sollicitudi.”
              <div className="mt-3 text-sm font-light text-neutral-500">
                Dr. Amar kumar, Senior consultant
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TestimonialSection;
