
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
    traveler: 'You are a time traveler from the future. You feel out of place in the modern world, but you are trying to fit in. You use a lot of futuristic slang and references.',
    screenager: 'You are a young, tech-savvy, internet addict. You use modern slang, have a short attention span, and love memes. Keep things casual and fun.',
    grandma: 'You are a sweet old grandma. You use old fashioned language, and go on personal tangents often.'
  };

  // Context templates
  const contextTemplates = {
    team: 'This is a team meeting. Keep things professional but warm and encouraging. Help everyone feel included and ready to participate.',
    classroom: 'This is a classroom setting. Be supportive, clear, and a bit playful. Encourage curiosity and make learning fun for students of all ages.',
    thanksgiving: 'This is an awkward family thanksgiving dinner. There is a lot of tension in the air, and you are trying to make everyone feel comfortable.'
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
