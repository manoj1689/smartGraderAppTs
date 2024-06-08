// import React, { useState, useEffect, useRef } from 'react';
// import { FaMicrophoneAlt ,FaMicrophoneAltSlash } from "react-icons/fa";

// const SpeechToText = ({ onTranscriptUpdate, isRecording, onRecordingChange }) => {
//   const [isListening, setIsListening] = useState(false);
//   const [isSupported, setIsSupported] = useState(true);
//   const [transcript, setTranscript] = useState('');
//   const recognition = useRef(null);

//   useEffect(() => {
//     const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
//     if (SpeechRecognition) {
//       recognition.current = new SpeechRecognition();
//       recognition.current.continuous = true;
//       recognition.current.interimResults = true;

//       recognition.current.onstart = () => {
//         setIsListening(true);
//         onRecordingChange(true);
//       };

//       recognition.current.onresult = (event) => {
//         let interimTranscript = '';
//         for (let i = event.resultIndex; i < event.results.length; i++) {
//           const result = event.results[i];
//           const transcriptPiece = result[0].transcript;
//           if (result.isFinal) {
//             setTranscript((prevTranscript) => prevTranscript + transcriptPiece.trim() + ' ');
//             onTranscriptUpdate(transcript + transcriptPiece.trim());
//             interimTranscript = ' ';
//           } else {
//             interimTranscript += transcriptPiece;
//           }
//         }
//         setTranscript((prevTranscript) => prevTranscript + interimTranscript.trim() + ' ');
//       };

//       recognition.current.onend = () => {
//         setIsListening(false);
//         onRecordingChange(false);
//         if (isRecording) {
//           recognition.current.start(); // Restart if still recording
//         }
//       };
//     } else {
//       setIsSupported(false);
//     }

//     return () => {
//       if (recognition.current) {
//         recognition.current.stop();
//         recognition.current = null;
//       }
//     };
//   }, [onTranscriptUpdate, onRecordingChange, isRecording, transcript]);

//   const toggleListening = () => {
//     if (isListening) {
//       recognition.current.stop();
//     } else {
//       setTranscript('');
//       recognition.current.start();
//     }
//   };

//   if (!isSupported) {
//     return (
//       <div className="text-red-600 bg-red-100 p-4 border border-red-300 rounded-lg">
//         Speech recognition is not available in your browser.
//       </div>
//     );
//   }

//   return (
//     <div className="flex flex-col items-start p-4 bg-white shadow-lg rounded-lg">
//       <div
//         onClick={toggleListening}
//         className={`flex items-center px-4 py-2 rounded-lg font-semibold text-white ${
//           isListening ? 'text-red-500 hover:text-red-600' : 'text-green-500 hover:text-green-700'
//         }`}>
//         {isListening ? <FaMicrophoneAltSlash size={25} className="mr-2" /> : <FaMicrophoneAlt size={25} className="mr-2" />}
//         {isListening ? 'Stop Recording' : 'Start Recording'}
//       </div>
//     </div>
//   );
// };

// export default SpeechToText;



import React, { useState, useEffect, useRef } from 'react';

const SpeechToText = ({ onTranscriptUpdate, isRecording, onRecordingChange }) => {
  const [isListening, setIsListening] = useState(false);
  const [isSupported, setIsSupported] = useState(true);
  const [transcript, setTranscript] = useState('');
  const recognition = useRef(null);

  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      recognition.current = new SpeechRecognition();
      recognition.current.continuous = true;
      recognition.current.interimResults = true;

      recognition.current.onstart = () => {
        setIsListening(true);
        onRecordingChange(true);
      };

      recognition.current.onresult = (event) => {
        let interimTranscript = '';
        for (let i = event.resultIndex; i < event.results.length; i++) {
          const result = event.results[i];
          const transcriptPiece = result[0].transcript;
          if (result.isFinal) {
            setTranscript((prevTranscript) => prevTranscript + transcriptPiece.trim() + ' ');
            onTranscriptUpdate(transcript + transcriptPiece.trim());
            interimTranscript = ' ';
          } else {
            interimTranscript += transcriptPiece;
          }
        }
        setTranscript((prevTranscript) => prevTranscript + interimTranscript.trim() + ' ');
      };

      recognition.current.onend = () => {
        setIsListening(false);
        onRecordingChange(false);
        if (isRecording) {
          recognition.current.start(); // Restart if still recording
        }
      };
    } else {
      setIsSupported(false);
    }

    return () => {
      if (recognition.current) {
        recognition.current.stop();
        recognition.current = null;
      }
    };
  }, [onTranscriptUpdate, onRecordingChange, isRecording, transcript]);

  useEffect(() => {
    if (isRecording && !isListening) {
      recognition.current.start();
    } else if (!isRecording && isListening) {
      recognition.current.stop();
    }
  }, [isRecording, isListening]);

  if (!isSupported) {
    return (
      <div className="text-red-600 bg-red-100 p-4 border border-red-300 rounded-lg">
        Speech recognition is not available in your browser.
      </div>
    );
  }

  return null;
};

export default SpeechToText;
