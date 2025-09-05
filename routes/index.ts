import express from 'express';
import OpenAI from 'openai';
const router = express.Router();

/*
  GET home page. 
  Render a random web page in HTML and CSS
*/
router.get('/', async function(req, res, next) {
  try {
    if (!process.env.OPENAI_API_KEY) {
      return res.status(500).send('Missing OPENAI_API_KEY');
    }

    const client: OpenAI = new OpenAI({
      apiKey: process.env['OPENAI_API_KEY'],
    });

    const response: OpenAI.Responses.Response = await client.responses.create({
      model: 'gpt-3.5-turbo',
      instructions: 'You are a web developer that develops HTML and CSS pages',
      input: 'Respond with only HTML and CSS code',
    });

    // Remove fenced ```html / ```css blocks and closing fences
    const cleanResponse: string = response.output_text
      .replace(/```(?:html|css)?\s*/gi, '')
      .replace(/```/g, '')
      .trim();

    res.render('index', { response: cleanResponse });
  } catch (err) {
    next(err);
  }
});

export default router;
