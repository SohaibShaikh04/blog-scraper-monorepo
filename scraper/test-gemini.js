require('dotenv').config();
const axios = require('axios');

const API_KEY = process.env.GEMINI_API_KEY;

async function testGemini() {
  try {
    if (!API_KEY) {
      throw new Error('GEMINI_API_KEY not found');
    }

    const model = 'gemini-2.5-flash';
    const url =
      `https://generativelanguage.googleapis.com/v1/models/${model}:generateContent?key=${API_KEY}`;

    const response = await axios.post(
      url,
      {
        contents: [
          {
            parts: [
              { text: 'Say: Gemini 2.5 Flash is working correctly.' }
            ]
          }
        ]
      },
      {
        headers: { 'Content-Type': 'application/json' }
      }
    );

    console.log('✅ SUCCESS:');
    console.log(response.data.candidates[0].content.parts[0].text);

  } catch (err) {
    console.error(
      '❌ ERROR:',
      err.response?.data?.error?.message || err.message
    );
  }
}

testGemini();
