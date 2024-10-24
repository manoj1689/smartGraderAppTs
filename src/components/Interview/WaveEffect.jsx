import React, { useEffect, useState } from "react";

const Waveform = ({transcript}) => {
  const [textheight,setTextHeight]=useState("")
  const text = transcript || "";
 
  const words = text.split(" "); // Split the text into words
  //const words = text.split(" "); 
  useEffect(() => {
    const timer = setTimeout(() => {
     // console.log("words in intro", words);
      
      // Iterate over the words and update the height for each after a delay
      words.forEach((ele, index) => {
        setTimeout(() => {
          //console.log(ele.length);
          // Set a maximum height of 8 if the word length is greater than or equal to 8
          if (ele.length >= 8) {
            setTextHeight(8);
          } else {
            setTextHeight(ele.length);
          }
        }, index * 500); // Delay each update based on index (500ms for each word)
      });
    }, 100); // Initial delay before starting the updates
  
    // Cleanup function to clear the timeout
    return () => clearTimeout(timer);
  }, [words]);
  
  
 //console.log("update state after .1 sec ",textheight) 
 //console.log(transcript)    
  return (
    <>
      
      <div className="flex w-full  h-40 justify-center  items-center space-x-0.5 ">
    
    <div className="w-[2px] rounded-full bg-red-500 " style={{ animationDelay: '0.1s', height:`${textheight *Math.floor((Math.random() * 10))}px` }}></div>
    <div className="w-[2px] rounded-full bg-red-500 " style={{ animationDelay: '0.2s', height:`${textheight *Math.floor((Math.random() * 10))}px` }}></div>
    <div className="w-[2px] rounded-full bg-red-500 " style={{ animationDelay: '0.3s', height:`${textheight *Math.floor((Math.random() * 10))}px` }}></div>
    <div className="w-[2px] rounded-full bg-red-500 " style={{ animationDelay: '0.4s', height:`${textheight *Math.floor((Math.random() * 10))}px` }}></div>
    <div className="w-[2px] rounded-full bg-red-500 " style={{ animationDelay: '0.5s', height:`${textheight *Math.floor((Math.random() * 10))}px` }}></div>
    <div className="w-[2px] rounded-full bg-red-500 " style={{ animationDelay: '0.6s', height:`${textheight *Math.floor((Math.random() * 10))}px` }}></div>
    <div className="w-[2px] rounded-full bg-red-500 " style={{ animationDelay: '0.5s', height:`${textheight *Math.floor((Math.random() * 10))}px` }}></div>
    <div className="w-[2px] rounded-full bg-red-500 " style={{ animationDelay: '0.4s', height:`${textheight *Math.floor((Math.random() * 10))}px` }}></div>
    <div className="w-[2px] rounded-full bg-red-500 " style={{ animationDelay: '0.3s', height:`${textheight *Math.floor((Math.random() * 10))}px` }}></div>
    <div className="w-[2px] rounded-full bg-red-500 " style={{ animationDelay: '0.2s', height:`${textheight *Math.floor((Math.random() * 10))}px` }}></div>
    <div className="w-[2px] rounded-full bg-red-500 " style={{ animationDelay: '0.1s', height:`${textheight *Math.floor((Math.random() * 10))}px` }}></div>
    <div className="w-[2px] rounded-full bg-red-500 " style={{ animationDelay: '0.2s', height:`${textheight *Math.floor((Math.random() * 10))}px` }}></div>
    <div className="w-[2px] rounded-full bg-red-500 " style={{ animationDelay: '0.3s', height:`${textheight *Math.floor((Math.random() * 10))}px` }}></div>
    <div className="w-[2px] rounded-full bg-red-500 " style={{ animationDelay: '0.4s', height:`${textheight *Math.floor((Math.random() * 10))}px` }}></div>
    <div className="w-[2px] rounded-full bg-red-500 " style={{ animationDelay: '0.5s', height:`${textheight *Math.floor((Math.random() * 10))}px` }}></div>
    <div className="w-[2px] rounded-full bg-red-500 " style={{ animationDelay: '0.6s', height:`${textheight *Math.floor((Math.random() * 10))}px` }}></div>
    <div className="w-[2px] rounded-full bg-red-500 " style={{ animationDelay: '0.5s', height:`${textheight *Math.floor((Math.random() * 10))}px` }}></div>
    <div className="w-[2px] rounded-full bg-red-500 " style={{ animationDelay: '0.4s', height:`${textheight *Math.floor((Math.random() * 10))}px` }}></div>
    <div className="w-[2px] rounded-full bg-red-500 " style={{ animationDelay: '0.3s', height:`${textheight *Math.floor((Math.random() * 10))}px` }}></div>
    <div className="w-[2px] rounded-full bg-red-500 " style={{ animationDelay: '0.2s', height:`${textheight *Math.floor((Math.random() * 10))}px` }}></div>
    <div className="w-[2px] rounded-full bg-red-500 " style={{ animationDelay: '0.1s', height:`${textheight *Math.floor((Math.random() * 10))}px` }}></div>
    <div className="w-[2px] rounded-full bg-red-500 " style={{ animationDelay: '0.1s', height:`${textheight *Math.floor((Math.random() * 10))}px` }}></div>
    <div className="w-[2px] rounded-full bg-red-500 " style={{ animationDelay: '0.2s', height:`${textheight *Math.floor((Math.random() * 10))}px` }}></div>
    <div className="w-[2px] rounded-full bg-red-500 " style={{ animationDelay: '0.3s', height:`${textheight *Math.floor((Math.random() * 10))}px` }}></div>
    <div className="w-[2px] rounded-full bg-red-500 " style={{ animationDelay: '0.4s', height:`${textheight *Math.floor((Math.random() * 10))}px` }}></div>
    <div className="w-[2px] rounded-full bg-red-500 " style={{ animationDelay: '0.5s', height:`${textheight *Math.floor((Math.random() * 10))}px` }}></div>
    <div className="w-[2px] rounded-full bg-red-500 " style={{ animationDelay: '0.6s', height:`${textheight *Math.floor((Math.random() * 10))}px` }}></div>
    <div className="w-[2px] rounded-full bg-red-500 " style={{ animationDelay: '0.5s', height:`${textheight *Math.floor((Math.random() * 10))}px` }}></div>
    <div className="w-[2px] rounded-full bg-red-500 " style={{ animationDelay: '0.4s', height:`${textheight *Math.floor((Math.random() * 10))}px` }}></div>
    <div className="w-[2px] rounded-full bg-red-500 " style={{ animationDelay: '0.3s', height:`${textheight *Math.floor((Math.random() * 10))}px` }}></div>
    <div className="w-[2px] rounded-full bg-red-500 " style={{ animationDelay: '0.2s', height:`${textheight *Math.floor((Math.random() * 10))}px` }}></div>
    <div className="w-[2px] rounded-full bg-red-500 " style={{ animationDelay: '0.1s', height:`${textheight *Math.floor((Math.random() * 10))}px` }}></div>
    <div className="w-[2px] rounded-full bg-red-500 " style={{ animationDelay: '0.2s', height:`${textheight *Math.floor((Math.random() * 10))}px` }}></div>
    <div className="w-[2px] rounded-full bg-red-500 " style={{ animationDelay: '0.3s', height:`${textheight *Math.floor((Math.random() * 10))}px` }}></div>
    <div className="w-[2px] rounded-full bg-red-500 " style={{ animationDelay: '0.4s', height:`${textheight *Math.floor((Math.random() * 10))}px` }}></div>
    <div className="w-[2px] rounded-full bg-red-500 " style={{ animationDelay: '0.5s', height:`${textheight *Math.floor((Math.random() * 10))}px` }}></div>
    <div className="w-[2px] rounded-full bg-red-500 " style={{ animationDelay: '0.6s', height:`${textheight *Math.floor((Math.random() * 10))}px` }}></div>
    <div className="w-[2px] rounded-full bg-red-500 " style={{ animationDelay: '0.5s', height:`${textheight *Math.floor((Math.random() * 10))}px` }}></div>
    <div className="w-[2px] rounded-full bg-red-500 " style={{ animationDelay: '0.4s', height:`${textheight *Math.floor((Math.random() * 10))}px` }}></div>
    <div className="w-[2px] rounded-full bg-red-500 " style={{ animationDelay: '0.3s', height:`${textheight *Math.floor((Math.random() * 10))}px` }}></div>
    <div className="w-[2px] rounded-full bg-red-500 " style={{ animationDelay: '0.2s', height:`${textheight *Math.floor((Math.random() * 10))}px` }}></div>
    <div className="w-[2px] rounded-full bg-red-500 " style={{ animationDelay: '0.1s', height:`${textheight *Math.floor((Math.random() * 10))}px` }}></div>
    <div className="w-[2px] rounded-full bg-red-500 " style={{ animationDelay: '0.4s', height:`${textheight *Math.floor((Math.random() * 10))}px` }}></div>
    <div className="w-[2px] rounded-full bg-red-500 " style={{ animationDelay: '0.3s', height:`${textheight *Math.floor((Math.random() * 10))}px` }}></div>
    <div className="w-[2px] rounded-full bg-red-500 " style={{ animationDelay: '0.2s', height:`${textheight *Math.floor((Math.random() * 10))}px` }}></div>
    <div className="w-[2px] rounded-full bg-red-500 " style={{ animationDelay: '0.1s', height:`${textheight *Math.floor((Math.random() * 10))}px` }}></div>
    <div className="w-[2px] rounded-full bg-red-500 " style={{ animationDelay: '0.1s', height:`${textheight *Math.floor((Math.random() * 10))}px` }}></div>
    <div className="w-[2px] rounded-full bg-red-500 " style={{ animationDelay: '0.2s', height:`${textheight *Math.floor((Math.random() * 10))}px` }}></div>
    <div className="w-[2px] rounded-full bg-red-500 " style={{ animationDelay: '0.3s', height:`${textheight *Math.floor((Math.random() * 10))}px` }}></div>
    <div className="w-[2px] rounded-full bg-red-500 " style={{ animationDelay: '0.4s', height:`${textheight *Math.floor((Math.random() * 10))}px` }}></div>
    <div className="w-[2px] rounded-full bg-red-500 " style={{ animationDelay: '0.5s', height:`${textheight *Math.floor((Math.random() * 10))}px` }}></div>
    <div className="w-[2px] rounded-full bg-red-500 " style={{ animationDelay: '0.6s', height:`${textheight *Math.floor((Math.random() * 10))}px` }}></div>
    <div className="w-[2px] rounded-full bg-red-500 " style={{ animationDelay: '0.5s', height:`${textheight *Math.floor((Math.random() * 10))}px` }}></div>
    <div className="w-[2px] rounded-full bg-red-500 " style={{ animationDelay: '0.4s', height:`${textheight *Math.floor((Math.random() * 10))}px` }}></div>
    <div className="w-[2px] rounded-full bg-red-500 " style={{ animationDelay: '0.3s', height:`${textheight *Math.floor((Math.random() * 10))}px` }}></div>
    <div className="w-[2px] rounded-full bg-red-500 " style={{ animationDelay: '0.2s', height:`${textheight *Math.floor((Math.random() * 10))}px` }}></div>
    <div className="w-[2px] rounded-full bg-red-500 " style={{ animationDelay: '0.1s', height:`${textheight *Math.floor((Math.random() * 10))}px` }}></div>
    <div className="w-[2px] rounded-full bg-red-500 " style={{ animationDelay: '0.2s', height:`${textheight *Math.floor((Math.random() * 10))}px` }}></div>
    <div className="w-[2px] rounded-full bg-red-500 " style={{ animationDelay: '0.3s', height:`${textheight *Math.floor((Math.random() * 10))}px` }}></div>
    <div className="w-[2px] rounded-full bg-red-500 " style={{ animationDelay: '0.4s', height:`${textheight *Math.floor((Math.random() * 10))}px` }}></div>
    <div className="w-[2px] rounded-full bg-red-500 " style={{ animationDelay: '0.5s', height:`${textheight *Math.floor((Math.random() * 10))}px` }}></div>
    <div className="w-[2px] rounded-full bg-red-500 " style={{ animationDelay: '0.6s', height:`${textheight *Math.floor((Math.random() * 10))}px` }}></div>
    <div className="w-[2px] rounded-full bg-red-500 " style={{ animationDelay: '0.5s', height:`${textheight *Math.floor((Math.random() * 10))}px` }}></div>
    <div className="w-[2px] rounded-full bg-red-500 " style={{ animationDelay: '0.4s', height:`${textheight *Math.floor((Math.random() * 10))}px` }}></div>
    <div className="w-[2px] rounded-full bg-red-500 " style={{ animationDelay: '0.3s', height:`${textheight *Math.floor((Math.random() * 10))}px` }}></div>
    <div className="w-[2px] rounded-full bg-red-500 " style={{ animationDelay: '0.2s', height:`${textheight *Math.floor((Math.random() * 10))}px` }}></div>
    <div className="w-[2px] rounded-full bg-red-500 " style={{ animationDelay: '0.1s', height:`${textheight *Math.floor((Math.random() * 10))}px` }}></div>
    
  </div>
    </>

  );
};

export default Waveform;










