// interface.ts
import { ChangeEvent } from "react";
export interface LoginFormProps {
    onSubmit: (username: string, password: string) => void;
}


export interface LoginResponse {
    msg_code?: number;
    status: number;
    msg: string;
    name: string;
    email: string;
    created_on: string;
    is_verified: number;
    is_onboard: number;
    access_token: string;
    token_type: string;
}

export interface SignupRequest {
    name: string;
    email: string;
    password: string;
    user_type: string;
}

export interface User {
    name: string;
    email: string;
    user_type?: string;
    is_verified: number;
    created_on: string;
    user_id: number;
}

export interface QuestionAnswer {
    question_id: number;
    exam_id: string;
    duration: number;
    answer: string;
}

export interface EvaluationResponse {
    factual_accuracy: string;
    factual_accuracy_explanation: string;
    completeness: string;
    completeness_explanation: string;
    relevance: string;
    relevance_explanation: string;
    coherence: string;
    coherence_explanation: string;
    score: number;
    input_tokens: number;
    output_tokens: number;
    final_evaluation: string;
}

export interface FormData {
    email: string;
    password: string;
    agreedToTerms: boolean;
  }

 export interface Scores {
    technicalSkills: number;
    softSkills: number;
    commSkills: number;
  }

 export interface Result {
    id: number;
    title: string;
    status: "Good" | "Improvement" | "Excellent";
    color: string;
    score: number;
  }

  export interface Question {
    id: string;
    title: string;
    description: string;
    text: string;
    duration: number;
  }

  export interface QuestionPageProps {
    cardId: string;
  }
  export interface QuestionAdd {
    q: string;
    desc: string;
    type: number;
    duration: number;
  }
  
  export interface QuestionPayload {
    set_id: number;
    questions: QuestionAdd[];
  }
  
  export interface Category {
    id: number;
    name: string;
  }
  
  export interface Card {
    id: number;
    title: string;
    description: string;
    image_url:string
    level: string;
    rating: number;
    duration: number;
    questions_count: number;
  }
  export interface AnswerFieldProps {
    value: string;
    onChange: (event: ChangeEvent<HTMLTextAreaElement>) => void;
    placeholder: string;
    charLimit: number;
  }
  export interface Instructions {
    [key: string]: JSX.Element;
  }
  
  export interface ChecklistItem {
  isChecked: boolean;
  label: string;
}

export interface ChecklistProps {
  items: ChecklistItem[];
}

export interface MyFormData {
  email: string;
}

export interface Job {
  id: number;
  title: string;
  level: string;
  status: string;
  applicants: number;
  interviews: number;
}

export interface SearchItem {
  name: string;
}

export interface Option {
  value: string;
  label: string;
}
export interface Category {
  id: number;
  name: string;
}
export interface Job {
  id: number;
  title: string;
  Experienced: string;
  Respond: number;
  UnResponse: number;
  level: string;
  status: string;
  applicants: number;
  interviews: number;
  Date: string;
}

export interface LineScore {
  id: number;
  title: string;
  description: string;
  level: number;
  img_url: string;
  duration: number;
  questions_count: number;
  rating: number;
}


export interface OrganizationDashboardProps {
  organizationData: any; // Replace `any` with the actual type if known
}
export interface EducationalDashboardProps {
  educationalData: any; // Replace `any` with the actual type if known
}

export interface IndividualDashboardProps {
  individualData: any; // Replace `any` with the actual type if known
}
// Add more models as needed for other services and API requests/responses
