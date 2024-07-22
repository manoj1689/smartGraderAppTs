// routes.ts

export const ROUTES = {
    LOGIN: '/login',
    SIGNUP: '/signup',
    VERIFY_EMAIL: '/verifyemail',
    GET_USER: '/users/me',
    GET_OTP: '/getotp',
    VERIFY_OTP: '/verifyotp',
    CHANGE_PASSWORD: '/updatepw',
    CAREER_DOMAIN: '/users/career_domain',
    READ_CATEGORIES: '/categories/all',
    READ_SUBCATEGORIES: '/categories/subcat',
    SEARCH_CATEGORIES: '/categories/search',
    GET_ALL_SETS: '/sets/all',
    GET_SETS_ATTEMPTED: '/sets/attempted',
    GET_ALL_QUESTIONS: '/questions/all',
    SUBMIT_ANSWER: '/questions/answer',
    ADD_QUESTIONS: '/questions/add',
    EVALUATE_ANSWER: '/evaluate/answer',
    GENERATE_SUBJECTIVE_QUESTIONS: '/generate/subjective',
    GENERATE_INTERVIEW_QUESTIONS_JD: '/generate/byjd',
    GENERATE_INTERVIEW_QUESTIONS_RESUME: '/generate/byresume',
    PDF_TO_TEXT: '/generate/pdftotext',
    START_EXAM: '/exams/start',
    END_EXAM: '/exams/end',
    UPLOAD_MEDIA: '/media/upload',
};


export const ENDPOINTS = {
    GENERATE_SUBJECTIVE: "/generate/subjective",
    GENERATE_PDF_TO_TEXT: "/generate/pdftotext",
    GENERATE_BY_RESUME: "/generate/byresume",
    GENERATE_BY_JD: "/generate/byjd",
    SAVE_QUESTION_SET: "/save_question_set",
    FETCH_QUESTION: "/questions/all", 
    SUBMIT_ANSWER: "/questions/answer",
    FETCH_USER_DATA: "/users/me", 
    EXAM_END: "/exams/end", 
    EXAM_START: "/exams/start", 
    EXAM_RESULT: "/question_answer_evaluations", 
    MEDIA_UPLOAD: '/media/upload'
};
