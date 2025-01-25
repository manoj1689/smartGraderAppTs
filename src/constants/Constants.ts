// constants.ts

export const API_BASE_URL = 'http://api.smartgrader.in';
export const RESULT_BASE_URL = "http://localhost:5000";
export const DEFAULT_HEADERS = {
    'Content-Type': 'application/json',
};

export const AUTH_HEADERS = (token: string) => ({
    'Authorization': `Bearer ${token}`,
    ...DEFAULT_HEADERS,
});

// src/constants/constants.ts

export const REMEMBERED_EMAIL_KEY = 'rememberedEmail';
export const REMEMBERED_PASSWORD_KEY = 'rememberedPassword';
export const REMEMBERED_PASSWORD_EMAIL_KEY='PasswordEmailId';
export const JWT_TOKEN_KEY = 'accessToken';
export const EMAIL_ID_KEY = 'emailId';
export const LOGGED_IN_KEY = 'loggedIn';
export const INDIVIDAUL_USER_TYPE = 'U';
export const ORGANIZATION_USER_TYPE = 'O';
export const EDUCATIONAL_USER_TYPE = 'I';

export const PLACEHOLDERS = {
    USERNAME: 'Username',
    PASSWORD: 'Password',
    EMAIL: 'Email',
    NAME: 'Name',
    OTP: 'OTP',
    NEW_PASSWORD: 'New Password',
    CONFIRM_PASSWORD: 'Confirm Password',
    EXAM_ID: 'Exam ID',
    QUESTION_ID: 'Question ID',
    DURATION: 'Duration',
    ANSWER: 'Answer',
};

export const MESSAGES = {
    LOGIN_SUCCESS: 'Login successful!',
    LOGIN_FAILURE: 'Login failed. Please check your credentials.',
    SIGNUP_SUCCESS: 'Signup successful! Please check your email to verify your account.',
    SIGNUP_FAILURE: 'Signup failed. Please try again later.',
    EMAIL_VERIFIED: 'Email verified successfully!',
    OTP_SENT: 'OTP sent to your email address.',
    PASSWORD_CHANGED: 'Password changed successfully!',
    QUESTION_SUBMITTED: 'Answer submitted successfully!',
    ANSWER_EVALUATED: 'Answer evaluated successfully!',
    EXAM_STARTED: 'Exam started successfully!',
    EXAM_STARTED_ERROR: 'Error starting exams',
    EXAM_ENDED: 'Exam ended successfully!',
    EXAM_END_ERROR: 'Error ending exams',
    MEDIA_UPLOADED: 'Media uploaded successfully!',
    FETCH_QUESTION_ERROR: 'Error fetching questions',
    SUBMIT_ANSWER_ERROR: 'Error evaluating the answer.',
};

export const HEADERS = {
    MULTIPART: {
        "Content-Type": "multipart/form-data",
    },
};

export const QUESTION_SOURCE = {
    DOMAIN: "domain",
    RESUME: "resume",
    JOB_DESCRIPTION: "jobDescription",
    OWN_QUESTIONS: "ownQuestions",
};

