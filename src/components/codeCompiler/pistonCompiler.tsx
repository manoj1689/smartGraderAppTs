import React, { useState } from 'react';
import Editor from '@monaco-editor/react';
import axios from 'axios';
import { LanguageOption, PistonResponse } from "../../types/interfaces/interface";

const languageOptions: LanguageOption[] = [
  { label: 'JavaScript', value: 'javascript' },
  { label: 'Python', value: 'python' },
  { label: 'C++', value: 'cpp' },
  { label: 'Java', value: 'java' },
  { label: 'Go', value: 'go' },
];

interface CodeEditorProps {
  language: string;
  setLanguage: (language: string) => void;
  code: string;
  setCode: (code: string) => void;
  onSubmitCode: (output: string, error: string) => void;
}

const CodeEditor: React.FC<CodeEditorProps> = ({ language, setLanguage, code, setCode, onSubmitCode }) => {
  const [output, setOutput] = useState<string>('');

  const handleRunCode = async () => {
    try {
      const response = await axios.post<PistonResponse>('https://emkc.org/api/v2/piston/execute', {
        language: language,
        version: '*', // Use the latest version
        files: [
          {
            name: `main.${language}`,
            content: code,
          },
        ],
      });
  
      const result = response.data.run;
      if (result.stderr) {
        setOutput(result.stderr);
        onSubmitCode('', result.stderr); // Pass error to parent
      } else {
        setOutput(result.stdout);
        onSubmitCode(result.stdout, ''); // Pass output to parent
      }
    } catch (error: any) {
      setOutput(`Error: ${error.response?.data || error.message}`);
      onSubmitCode('', error.message); // Pass error to parent
    }
  };

  return (
    <div className="flex flex-col items-center w-full">
      {/* Language Selector */}
      <div className="flex space-x-2 mb-4">
        {languageOptions.map((option) => (
          <button
            key={option.value}
            className={`px-4 py-2 rounded ${language === option.value ? 'bg-blue-500 text-white' : 'bg-gray-300'}`}
            onClick={() => setLanguage(option.value)}
          >
            {option.label}
          </button>
        ))}
      </div>

      {/* Monaco Editor */}
      <Editor
        height="40vh"
        width="100%"
        language={language}
        value={code}
        onChange={(value) => setCode(value || '')}
        theme="vs-dark"
      />

      {/* Run Code Button */}
      <button
        onClick={handleRunCode}
        className="mt-4 px-6 py-2 bg-green-500 text-white rounded"
      >
        Run Code
      </button>

      {/* Output Section */}
      <div className="w-full mt-4 p-4 bg-gray-900 text-white rounded">
        <h3 className="text-lg font-semibold">Output:</h3>
        <pre>{output}</pre>
      </div>
    </div>
  );
};

export default CodeEditor;

