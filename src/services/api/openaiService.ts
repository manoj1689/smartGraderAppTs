import { OpenAI } from 'openai';

// Initialize OpenAI client with API key
const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true,
});

interface ChatMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

export const getChatbotResponse = async (messages: ChatMessage[]): Promise<string> => {
  try {
    console.log('Sending messages:', messages); // Debugging

    if (messages.length === 0 || !messages.some(msg => msg.role === 'user')) {
      throw new Error('No user message found in the provided messages');
    }

    const userMessage = messages.find(msg => msg.role === 'user')?.content || '';

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content: `You are a helpful assistant tasked with identifying the intent behind a user's sentence. Given the following user input, please classify the intent into one of the categories below: "Introduce", "Continue", "User Not Available", "Leave", "Unclear", "Repeat", "Move to a new question", or "Explain". If the intent is unclear, ask "Do you want to continue, leave, repeat, move to a new question, or explain?" again.`,
        },
        { role: 'user', content: userMessage },
      ],
      max_tokens: 500,
    });

    if (!completion.choices || completion.choices.length === 0) {
      throw new Error('No choices available in completion response');
    }

    const choice = completion.choices[0];
    if (!choice.message || !choice.message.content) {
      throw new Error('No content available in choice message');
    }

    let intent = choice.message.content.trim().toLowerCase();

    if (intent.includes('continue')) {
      return 'Continue';
    } else if (intent.includes('leave')) {
      return 'Leave';
    } else if (intent.includes('move to a new question')) {
      return 'Move to a new question';
    } else if (intent.includes('introduce')) {
      return 'Introduce';
    } else if (intent.includes('repeat')) {
      return 'Repeat';
    } else if (intent.includes('user not available')) {
      return 'User Not Available';
    } else if (intent.includes('explain')) {
      return 'Explain';
    } else {
      return 'Unclear';
    }
  } catch (error) {
    console.error('Error determining intent:', error);
    return 'Error';
  }
};


export const explainChatbotResponse = async (messages: ChatMessage[]): Promise<string | undefined> => {
  console.log('Sending messages:', messages);  // Debugging

  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-4o-mini',// Ensure this model is correct for your use case
      messages: messages.map(msg => ({
        role: msg.role,
        content: msg.content,
      })),
      max_tokens: 500,
    });

    console.log('API Response:', response);  // Debugging
    // Ensure content is a string, or return undefined
    return response.choices[0]?.message?.content ?? undefined;
  } catch (error:any) {
    console.error('Error with OpenAI API:', error.response ? error.response.data : error.message);  // Debugging
    throw new Error('Error fetching response from OpenAI API');
  }
};





// // Test function to simulate user inputs and log the intent
// const testIntentDetermination = async () => {
//   const testMessages: ChatMessage[][] = [
//     [{ role: 'user', content: 'I want to leave the exam.' }],
//     [{ role: 'user', content: 'Yes, I would like to continue.' }],
//     [{ role: 'user', content: 'Can we move on to the next question?' }],
//     [{ role: 'user', content: 'I\'m not sure what to do next.' }],
//     [{ role: 'user', content: 'Could you tell me more about what happens now?' }],
//   ];

//   for (const messages of testMessages) {
//     const intent = await getChatbotResponse(messages);
//     console.log(`Intent for message "${messages[0].content}": ${intent}`);
//   }
// };

// // Run the test
// testIntentDetermination();
