import { OpenAI } from 'openai';

// Initialize OpenAI client with API key
const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,dangerouslyAllowBrowser:true
});

interface ChatMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

export const getChatbotResponse = async (messages: ChatMessage[]): Promise<string | undefined> => {
  console.log('Sending messages:', messages);  // Debugging

  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-4', // Ensure this model is correct for your use case
      messages: messages.map(msg => ({
        role: msg.role,
        content: msg.content,
      })),
    });

    console.log('API Response:', response);  // Debugging
    // Ensure content is a string, or return undefined
    return response.choices[0]?.message?.content ?? undefined;
  } catch (error:any) {
    console.error('Error with OpenAI API:', error.response ? error.response.data : error.message);  // Debugging
    throw new Error('Error fetching response from OpenAI API');
  }
};
