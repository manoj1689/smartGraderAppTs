
import axiosInstance from "../axios/axiosInstance";
import { HEADERS, QUESTION_SOURCE } from "../../constants/constants";
import { ENDPOINTS } from "../../constants/endpoints";



export interface FormData {
  resume?: File;
  numberOfQuestions?: number;
  ownQuestions?: string;
  [key: string]: any;
}

export interface Question {
  question_text: string;
  expected_answer_format?: string;
}

class QuestionService {
  async generateQuestions(questionSource: string, data: FormData): Promise<Question[]> {
    let newQuestions: Question[] = [];

    try {
      console.log(`Sending request to ${questionSource} with data:`, data);

      switch (questionSource) {
        case QUESTION_SOURCE.DOMAIN:
          const domainResponse = await axiosInstance.post(ENDPOINTS.GENERATE_SUBJECTIVE, data);
          newQuestions = domainResponse.data.questions;
          break;
        case QUESTION_SOURCE.RESUME:
          const formData = new FormData();
          formData.append("file", data.resume!);
          const resumeResponse = await axiosInstance.post(ENDPOINTS.GENERATE_PDF_TO_TEXT, formData, {
            headers: HEADERS.MULTIPART,
          });
          console.log('Resume response data:', resumeResponse.data);
          const parsedResumeText = resumeResponse.data.text;
          const questionsResponse = await axiosInstance.post(ENDPOINTS.GENERATE_BY_RESUME, {
            resume: parsedResumeText,
            number_of_questions: data.numberOfQuestions,
          });
          newQuestions = questionsResponse.data.questions;
          break;
        case QUESTION_SOURCE.JOB_DESCRIPTION:
          const jdResponse = await axiosInstance.post(ENDPOINTS.GENERATE_BY_JD, data);
          newQuestions = jdResponse.data.questions;
          break;
        case QUESTION_SOURCE.OWN_QUESTIONS:
          newQuestions = data.ownQuestions?.split("\n").map((question) => ({
            question_text: question,
            expected_answer_format: "",
          })) || [];
          break;
        default:
          break;
      }
      console.log('Generated questions:', newQuestions);
      return newQuestions;
    } catch (error) {
      console.error(`Error in generating questions: ${error.message}`);
      throw error;
    }
  }

  async saveQuestionSet(questions: Question[], examTiming: number): Promise<void> {
    try {
      console.log('Saving question set with data:', { questions, exam_timing: examTiming });
      await axiosInstance.post(ENDPOINTS.SAVE_QUESTION_SET, {
        questions,
        exam_timing: examTiming,
      });
    } catch (error) {
      console.error(`Error in saving question set: ${error.message}`);
      throw error;
    }
  }
}

export default new QuestionService();
