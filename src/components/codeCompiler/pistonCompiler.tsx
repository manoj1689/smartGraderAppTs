import React, { useState } from 'react';
import Editor from '@monaco-editor/react';
import axios from 'axios';
import Select from 'react-select';
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
  const [selectedOption, setSelectedOption] = useState<LanguageOption | null>(
    languageOptions.find((option) => option.value === language) || null
  );

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

  const handleLanguageChange = (selected: LanguageOption | null) => {
    setSelectedOption(selected);
    setLanguage(selected?.value || ''); // Update language in the parent component
  };

  return (
    <div className="flex flex-col w-full  ">
      {/* Language Selector Dropdown */}
      <div className="mb-4">
  <div className='flex w-full justify-end pr-4'>
    <div className='flex lg:w-1/3'>
      <Select
        value={selectedOption}
        onChange={handleLanguageChange}
        options={languageOptions}
        className="w-full"  // Ensures it takes up the full 1/3 width of the parent div
      />
    </div>
  </div>
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

      {/* Run Code and Next Question Buttons */}
      <div className='flex w-5/6 mx-auto gap-5'>
        <div className='flex w-full'>
          <button
            onClick={handleRunCode}
            className="flex mt-4 px-6 py-4 bg-green-500 text-white w-full justify-center items-center rounded"
          >
            Run Code
          </button>
        </div>
        <div className='flex w-full'>
          <button
            onClick={handleRunCode}
            className="flex mt-4 px-6 py-4 bg-sky-500 w-full text-white justify-center items-center rounded"
          >
            Next Question
          </button>
        </div>
      </div>
   
      {/* Output Section */}
      <div className="w-full mt-4 mb-8 p-4 bg-gray-900 text-white rounded">
        <h3 className="text-lg font-semibold">Output:</h3>
        <pre>{output}</pre>
      </div>
    </div>
  );
};

export default CodeEditor;



