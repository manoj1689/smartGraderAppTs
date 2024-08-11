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

    // Ensure the messages array is not empty and contains a user message
    if (messages.length === 0 || !messages.some(msg => msg.role === 'user')) {
      throw new Error('No user message found in the provided messages');
    }

    // Extract the user message
    const userMessage = messages.find(msg => msg.role === 'user')?.content || '';
    const normalizedResponse = userMessage.trim().toLowerCase();

    // Quick intent handling based on specific responses
    if (normalizedResponse === 'no') {
      return 'Leave';
    }
    if (normalizedResponse === 'yes') {
      return 'Continue';
    }

    // Request completion from OpenAI
    const completion = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        {
          role: 'system',
          content: `You are a helpful assistant tasked with identifying the intent behind a user's sentence. Given the following user input, please classify the intent into one of the categories below: "Introduce", "Continue","Not speak", "Leave","Unclear","Repeat or "Move to a new question". If the intent is unclear, ask "Do you want to continue, leave, repeat or move to a new question?" again.`,
        },
        { role: 'user', content: userMessage },
      ],
      max_tokens: 10,
    });

    // Safeguard against null or undefined choices
    if (!completion.choices || completion.choices.length === 0) {
      throw new Error('No choices available in completion response');
    }

    // Extract and clean the intent from the response
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
    } else if (intent.includes('not speak')) {
      return 'Not Speak';
    }
    else {
      return 'Unclear';
    }
  } catch (error) {
    console.error('Error determining intent:', error);
    return 'Error';
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
