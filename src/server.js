// index.js
import express from 'express';
import cors from 'cors';

const app = express();
const port = 5000;

app.use(cors());

app.get('/', (req, res) => {
  const userData = {
    name: "Shivam Kumar",
    role: "Frontend Developer",
    interviewDate: "22 April 2024, 9:30 PM IST",
    totalTime: "50 Minutes",
    profileImage: "./../.../",
    scores: [
      { skill: "HTML/CSS", sub_skill: "HTML/CSS Basic and Advanced Skill", score: 7, maxScore: 10 },
      { skill: "JavaScript", sub_skill: "JavaScript Fundamentals", score: 4, maxScore: 10 },
      { skill: "React JS", sub_skill: "React JS main concept and Advanced", score: 2, maxScore: 10 },
    ],
    candidateRating: { no: "0-6", yes: "6-8", strong: "8-10" },
    evaluationRecords: [
      {
        question: "What is OOP concept?",
        user_answer: "Object-Oriented Programming & System (OOPS). OOPSObject-oriented programming is a programming paradigm based on",
        knowledge_level: "beginner",
        factual_accuracy: 1,
        factual_accuracy_explanation: "The answer inaccurately expands the acronym OOPS as 'Object-Oriented Programming & System' instead of the correct 'Object-Oriented Programming System'. There is also a repetition and truncation issue, which further detracts from the factual accuracy.",
        completeness: 1,
        completeness_explanation: "The answer is incomplete. It does not explain the core concepts of OOP such as classes, objects, inheritance, polymorphism, encapsulation, and abstraction, which are fundamental to understanding the OOP paradigm.",
        relevance: 2,
        relevance_explanation: "While the answer starts with a relevant topic, it fails to provide any meaningful or detailed information about OOP concepts. The response is also fragmented and does not fully address the question.",
        coherence: "very poor",
        coherence_explanation: "The answer lacks logical structure and clarity. It is fragmented and includes repetitive elements ('OOPSOOPSObject-oriented programming'), which disrupt the flow and make it difficult to understand.",
        score: 1,
        input_tokens: 407,
        output_tokens: 336,
        final_evaluation: "The student's answer is factually incorrect, incomplete, and lacks coherence. To improve, the student should correctly define OOP as 'Object-Oriented Programming System' and provide detailed explanations of key concepts such as classes, objects, inheritance, polymorphism, encapsulation, and abstraction. Additionally, the response should be logically structured and free from repetition or truncation errors."
      },
      {
        question: "Explain polymorphism in OOP?",
        user_answer: "Polymorphism in OOP is when an object can take many forms.",
        knowledge_level: "beginner",
        factual_accuracy: 3,
        factual_accuracy_explanation: "The answer correctly identifies polymorphism as the ability of an object to take many forms but lacks detail on method overriding and method overloading.",
        completeness: 1,
        completeness_explanation: "The answer is too brief and does not cover the different types of polymorphism or provide examples.",
        relevance: 2,
        relevance_explanation: "The answer is relevant but too simplistic and lacks depth.",
        coherence: 1,
        coherence_explanation: "The answer is coherent but needs more information to fully explain the concept.",
        score: 3,
        input_tokens: 300,
        output_tokens: 250,
        final_evaluation: "The answer needs more detail and examples to fully explain polymorphism in OOP. It should cover method overriding, method overloading, and provide practical examples."
      },
      {
        question: "What is encapsulation in OOP?",
        user_answer: "Encapsulation is hiding the data.",
        knowledge_level: "beginner",
        factual_accuracy: 5,
        factual_accuracy_explanation: "The answer is partially correct but too simplistic. Encapsulation involves wrapping data and methods into a single unit and restricting access to the internal state.",
        completeness: 3,
        completeness_explanation: "The answer is incomplete and does not explain the importance or how encapsulation is achieved.",
        relevance: 4,
        relevance_explanation: "The answer is relevant but lacks detail and completeness.",
        coherence: "poor",
        coherence_explanation: "The answer is too brief and lacks structure.",
        score: 2,
        input_tokens: 280,
        output_tokens: 230,
        final_evaluation: "The answer needs to explain encapsulation more thoroughly, including how it is implemented using access modifiers and its benefits in OOP."
      },
      {
        question: "Define inheritance in OOP?",
        user_answer: "Inheritance is when a class inherits properties from another class.",
        knowledge_level: "beginner",
        factual_accuracy: 2,
        factual_accuracy_explanation: "The answer correctly defines inheritance but lacks detail on the types of inheritance and examples.",
        completeness: 4,
        completeness_explanation: "The answer covers the basic definition but does not elaborate on the types of inheritance or the benefits.",
        relevance: 5,
        relevance_explanation: "The answer is relevant and correct but could be more detailed.",
        coherence: 3,
        coherence_explanation: "The answer is coherent but brief.",
        score: 4,
        input_tokens: 310,
        output_tokens: 260,
        final_evaluation: "The answer should include more details on types of inheritance (single, multiple, multilevel, hierarchical, hybrid) and provide examples to illustrate the concept."
      },
      {
        question: "Explain abstraction in OOP?",
        user_answer: "Abstraction is hiding implementation details.",
        knowledge_level: "beginner",
        factual_accuracy: 4,
        factual_accuracy_explanation: "The answer correctly identifies abstraction as hiding implementation details but lacks detail on how abstraction is achieved.",
        completeness: "poor",
        completeness_explanation: "The answer is too brief and does not explain the methods or benefits of abstraction.",
        relevance: 2,
        relevance_explanation: "The answer is relevant but lacks depth.",
        coherence: 5,
        coherence_explanation: "The answer is coherent but needs more information to fully explain the concept.",
        score: 3,
        input_tokens: 290,
        output_tokens: 240,
        final_evaluation: "The answer should explain abstraction more thoroughly, including how it is implemented using abstract classes and interfaces, and its benefits in OOP."
      }
    ]
  };

  res.send(userData);
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
