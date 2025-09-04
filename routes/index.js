var express = require('express');
var router = express.Router();
var ai = require('openai');

/*
  GET home page. 
  Render a random web page in HTML and CSS.
*/
router.get('/', async function(req, res, next) {
  const client = new ai.OpenAI({
    apiKey: process.env['OPENAI_API_KEY'],
  });

  const response = await client.responses.create({
    model: 'gpt-3.5-turbo',
    instructions: 'You are a web developer that develops aesthetic HTML and CSS pages',
    input: 'Respond with only HTML and CSS code',
  });


  let cleanResponse = response.output_text
    .replace(/```html\s*/gi, '')
    .replace(/```\s*/gi, '');

  res.render('index', { response: cleanResponse });
});

module.exports = router;
