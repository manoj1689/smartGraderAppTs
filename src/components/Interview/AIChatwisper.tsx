import React, { useState } from 'react';
import { OpenAI } from 'openai';
import { AudioRecorder } from 'react-audio-voice-recorder';
import ReactAudioPlayer from 'react-audio-player';

const predefinedQuestions = [
  "Tell me about yourself.",
  "What are your strengths and weaknesses?",
  "Why do you want to work here?",
  "Describe a challenging situation and how you overcame it.",
  "Where do you see yourself in five years?"
];

const AIChat = () => {
  const [audioFile, setAudioFile] = useState<Blob | null>(null);
  const [transcription, setTranscription] = useState<string | null>(null);
  const [gptResponse, setGptResponse] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0); // Track current question
  const [intent, setIntent] = useState<string | null>(null); // Track the user's intent

  // Initialize OpenAI client
  const openai = new OpenAI({
    apiKey: import.meta.env.VITE_OPENAI_API_KEY, // Use environment variable
    dangerouslyAllowBrowser: true,
  });

  // Handle audio recording completion
  const handleAudioRecording = (blob: Blob) => {
    setAudioFile(blob); // Set the recorded audio Blob
  };

  // Handle form submission
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!audioFile) {
      alert("Please record an audio file first");
      return;
    }

    setLoading(true);
    try {
      // Step 1: Transcribe the audio using Whisper
      const formData = new FormData();
      formData.append("file", audioFile, "recording.webm");

      const transcriptionResponse = await openai.audio.transcriptions.create({
        file: formData.get("file"),
        model: "whisper-1",
        language: "en",
      });

      console.log("Transcription:", transcriptionResponse.text);
      setTranscription(transcriptionResponse.text);

      // Step 2: Get the user's intent from GPT-4 based on transcription
      const intentResponse = await openai.chat.completions.create({
        model: "gpt-4",
        messages: [
          {
            role: "system",
            content: "You are an interviewer. Ask questions and detect the intent from the user's response. The intents are: Continue, Repeat, or Exit."
          },
          {
            role: "user",
            content: transcriptionResponse.text,
          },
        ],
      });

      const detectedIntent = intentResponse.choices[0].message.content;
      console.log("Detected Intent:", detectedIntent);
      setIntent(detectedIntent);

      // Step 3: Based on intent, respond or move to the next question
      if (detectedIntent.includes("Exit")) {
        setGptResponse("Interview ended. Thank you for your time.");
      } else if (detectedIntent.includes("Repeat")) {
        setGptResponse(predefinedQuestions[currentQuestionIndex]); // Repeat the current question
      } else {
        // Continue to the next question
        if (currentQuestionIndex < predefinedQuestions.length - 1) {
          setCurrentQuestionIndex(currentQuestionIndex + 1);
          setGptResponse(null); // Clear the previous response
          setAudioUrl(null); // Clear the previous audio URL
          setTranscription(null); // Clear the transcription
        } else {
          setGptResponse("Interview complete. Thank you!");
        }
      }

    } catch (error) {
      console.error("Error processing audio:", error);
      alert("Failed to process the audio");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-6">AI Chat - Interview Simulator</h1>

      {/* Display Current Question */}
      <div className="mb-4">
        <h2 className="text-xl font-bold mb-2">Current Question:</h2>
        <p className="bg-gray-100 p-4 rounded">{predefinedQuestions[currentQuestionIndex]}</p>
      </div>

      {/* Audio Recorder */}
      <div className="mb-4">
        <h2 className="text-xl font-bold mb-2">Record your voice:</h2>
        <AudioRecorder 
          onRecordingComplete={handleAudioRecording}
          audioTrackConstraints={{
            noiseSuppression: true,
            echoCancellation: true,
          }} 
          downloadOnSavePress={true}
          downloadFileExtension="webm"
        />
      </div>

      <form onSubmit={handleSubmit}>
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700"
          disabled={loading}
        >
          {loading ? 'Processing...' : 'Submit Audio'}
        </button>
      </form>

      {transcription && (
        <div className="mt-6">
          <h2 className="text-xl font-bold mb-2">Transcription:</h2>
          <p className="bg-gray-100 p-4 rounded">{transcription}</p>
        </div>
      )}

      {gptResponse && (
        <div className="mt-6">
          <h2 className="text-xl font-bold mb-2">AI Response:</h2>
          <p className="bg-gray-100 p-4 rounded">{gptResponse}</p>
        </div>
      )}

      {intent && (
        <div className="mt-6">
          <h2 className="text-xl font-bold mb-2">Detected Intent:</h2>
          <p className="bg-gray-100 p-4 rounded">{intent}</p>
        </div>
      )}

      {audioUrl && (
        <div className="mt-6">
          <h2 className="text-xl font-bold mb-2">AI Response Audio:</h2>
          <ReactAudioPlayer
            src={audioUrl}
            autoPlay
            controls
          />
        </div>
      )}
    </div>
  );
};

export default AIChat;

