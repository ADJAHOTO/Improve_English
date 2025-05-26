import { Elysia } from 'elysia'
import { cors } from '@elysiajs/cors'
import dotenv from 'dotenv';
dotenv.config();

const app = new Elysia()
  .use(cors()) // Autorise les requêtes du frontend
  .post('/chat', async ({ body }) => {
    // Type assertion for body
    const { messages } = body as { messages: unknown };
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'openai/gpt-4o-mini',
        messages,
        max_tokens: 500
      })
    })
    return response.json()
  })
  .listen(3001)

console.log(`🦊 Backend running at ${app.server?.url}`)