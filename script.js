
// Get references to the buttons, dropdowns, and the response area
const iceBtn = document.getElementById('iceBtn');
const factBtn = document.getElementById('factBtn');
const jokeBtn = document.getElementById('jokeBtn');
const weatherBtn = document.getElementById('weatherBtn');
const responseDiv = document.getElementById('response');
const contextSelect = document.getElementById('contextSelect');
const personaSelect = document.getElementById('personaSelect');

// Get your OpenAI API key from secrets.js
// secrets.js should define: const apiKey = "your-key";
// We use 'apiKey' here

// This function sends a prompt to OpenAI and returns the response
async function getOpenAIResponse(prompt) {
  // The URL for the OpenAI API
  const url = 'https://api.openai.com/v1/chat/completions';

  // Get the selected context and persona from the dropdowns
  const context = contextSelect.value;
  const persona = personaSelect.value;

  // Set the system message based on the selected context and persona
  let secretSystemMessage = '';

  // Persona templates
  const personaTemplates = {
    friendly: 'You are Fillr, a super friendly coworker. You are positive, supportive, and always ready to help. Keep things warm, welcoming, and easy to understand.',
    sassy: 'You are Fillr, a sassy intern. You are witty, playful, and a little cheeky, but never mean. Use fun, modern slang and keep things light-hearted.',
    professor: 'You are Fillr, a wise and encouraging professor bot. You explain things clearly, use a touch of humor, and inspire curiosity in others.'
  };

  // Context templates
  const contextTemplates = {
    team: 'This is a team meeting. Keep things professional but warm and encouraging. Help everyone feel included and ready to participate.',
    classroom: 'This is a classroom setting. Be supportive, clear, and a bit playful. Encourage curiosity and make learning fun for students of all ages.',
    date: 'This is a date night. Be polite, engaging, and a little flirty.'
  };

  // Build the system message by combining persona and context
  const personaMsg = personaTemplates[persona] || personaTemplates.friendly;
  const contextMsg = contextTemplates[context] || '';
  secretSystemMessage = `${personaMsg} ${contextMsg}`;

  // The body of the request, using the gpt-4.1 model
  const data = {
    model: 'gpt-4.1',
    messages: [
      { role: 'system', content: secretSystemMessage },
      { role: 'user', content: prompt }
    ],
    max_tokens: 200 // Increased for longer responses
  };

  // Send the request using fetch and wait for the response
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`
    },
    body: JSON.stringify(data)
  });

  // Parse the JSON response
  const result = await response.json();

  // Return the generated message from OpenAI
  return result.choices[0].message.content;
}

// This function displays the response on the page
function showResponse(text) {
  responseDiv.textContent = text;
}

// This function shows a random loading message
function showLoading() {
  // Array of fun loading messages
  const loadingMessages = [
    'Thinking of something awesome... 🤔',
    'Cooking up a response... 🍳',
    'Getting creative... 🎨',
    'Just a moment, please! ⏳',
    'Filling the silence... 🧊',
    'Let me find something fun... 🔍'
  ];
  // Pick a random message
  const msg = loadingMessages[Math.floor(Math.random() * loadingMessages.length)];
  responseDiv.textContent = msg;
}

// Add event listeners to each button
iceBtn.addEventListener('click', async () => {
  // Ask OpenAI for an icebreaker question
  showLoading();
  const prompt = 'Write a simple, friendly icebreaker question for a group. Only respond with the icebreaker question itself,  and a little extra text.';
  const response = await getOpenAIResponse(prompt);
  showResponse(response);
});

factBtn.addEventListener('click', async () => {
  // Ask OpenAI for a fun fact
  showLoading();
  const prompt = 'Share a fun, surprising fact that most people don\'t know. Only respond with the fact itself,  and a little extra text.';
  const response = await getOpenAIResponse(prompt);
  showResponse(response);
});

jokeBtn.addEventListener('click', async () => {
  // Ask OpenAI for a friendly joke
  showLoading();
  const prompt = 'Write a friendly, clean joke that will make people smile. Only respond with the joke itself, and a little extra text.';
  const response = await getOpenAIResponse(prompt);
  showResponse(response);
});

weatherBtn.addEventListener('click', async () => {
  // Ask OpenAI for a weather-related prompt
  showLoading();
  const prompt = 'Write a short, friendly prompt that encourages people to share what the weather is like where they are. Only respond with the prompt itself, and a little extra text.';
  const response = await getOpenAIResponse(prompt);
  showResponse(response);
});
