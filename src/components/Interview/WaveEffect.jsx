// App.js
import React, { useState, useEffect, useRef } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import user from "../../assets/user.png"

const App = ({showWave,transcript}) => {

  const [borderWidth, setBorderWidth] = useState(4); // Default border width

  const audioContextRef = useRef(null);
  const analyserRef = useRef(null);
  const dataArrayRef = useRef(null);

  if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
    return <div>Your browser does not support speech recognition.</div>;
  }

  useEffect(() => {
    if (showWave) {
      navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
        audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
        const source = audioContextRef.current.createMediaStreamSource(stream);
        analyserRef.current = audioContextRef.current.createAnalyser();
        analyserRef.current.fftSize = 256;
        const bufferLength = analyserRef.current.frequencyBinCount;
        dataArrayRef.current = new Uint8Array(bufferLength);
        source.connect(analyserRef.current);

        const updateBorderWidth = () => {
          if (analyserRef.current) {
            analyserRef.current.getByteFrequencyData(dataArrayRef.current);
            const avgVolume = dataArrayRef.current.reduce((a, b) => a + b, 0) / bufferLength;
            setBorderWidth(Math.min(Math.max(avgVolume / 3, 4), 100)); // Adjust border width range
          }
          requestAnimationFrame(updateBorderWidth);
        };

        updateBorderWidth();
      });
    } else {
      if (audioContextRef.current) {
        audioContextRef.current.close();
        audioContextRef.current = null;
        analyserRef.current = null;
        dataArrayRef.current = null;
      }
      setBorderWidth(4); // Reset border width when stopped
    }
  }, [showWave]);


  return (
    <div className=" flex flex-col items-center justify-center bg-gray-200 rounded-sm shadow-md p-4">
      <div className="relative flex w-full  ">
      <div className='sm:hidden w-full flex flex-col bg-gray-100 rounded-lg mr-2  p-2'>
        <div className='text-sm text-sky-400 font-bold '>Speech Text -</div>
        <div className='font-medium text-gray-600 text-md max-h-20 overflow-y-auto'>
  {transcript}
</div>

        </div>
      <div className='flex max-sm:w-32  w-full justify-center items-center '>
      <div className="relative w-24 h-24 sm:w-40 sm:h-40 flex items-center justify-center">
          <div
            className={`absolute inset-0 rounded-full border  border-gray-500 transition-transform ${showWave ? 'animate-borderGrow' : ''}`}
            style={{
              borderWidth: `${borderWidth}px`,
              borderColor: 'rgba(0, 0, 0, 0.5)',
            }}
          />
          <div className="absolute inset-0 flex items-center justify-center">
          <button
      className={`w-20 h-20 sm:w-28 sm:h-28 rounded-full text-white focus:outline-none flex items-center justify-center ${showWave ? 'bg-blue-500' : 'bg-red-500'}`}
    >
      {/* {showWave ? 'Stop' : 'Start'} */}
      <img src={user} alt="user" className='w-16 h-16 sm:w-24 sm:h-24' />
    </button>
   
          </div>
         
        </div>
     
      </div>

       
      </div>
     
    </div>
  );
};

export default App;






