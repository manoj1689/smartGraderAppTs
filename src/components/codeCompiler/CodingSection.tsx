import React, { useState } from 'react';
import CodeEditor from './pistonCompiler'; // Adjust the path based on your project structure

// Main component for Coding Section
const CodingSection: React.FC = () => {
  const [language, setLanguage] = useState<string>('javascript');
  const [code, setCode] = useState<string>('// Write your code here');
  const [outputMessage, setOutputMessage] = useState<string>('');

  // Handle the result submission from CodeEditor
  const handleSubmitCode = (output: string, error: string) => {
    if (error) {
      setOutputMessage(`Error: ${error}`);
    } else {
      setOutputMessage(`Output: ${output}`);
    }
  };

  return (
    <div className="flex flex-col items-center w-full p-4">
      {/* Code Editor */}
      <CodeEditor
        language={language}
        setLanguage={setLanguage}
        code={code}
        setCode={setCode}
        onSubmitCode={handleSubmitCode}
      />

    

    </div>
  );
};

export default CodingSection;

