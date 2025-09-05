import OpenAI from 'openai';
jest.mock('openai');

interface AIResponse {
  output_text: string;
}

describe('OpenAI HTML/CSS generation', () => {
  let response: AIResponse;

  beforeAll(async () => {
    const client = new OpenAI({ apiKey: 'test-key' });
    response = await client.responses.create({
      model: 'gpt-3.5-turbo',
      instructions: 'You are a web developer that develops HTML and CSS pages',
      input: 'Respond with only HTML and CSS code',
    });
    expect(response).toBeDefined();
  });

  test('contains HTML fenced block', () => {
    expect(response.output_text).toContain('```html');
  });

  test('contains CSS fenced block', () => {
    expect(response.output_text).toContain('```css');
  });

  test('HTML appears before CSS', () => {
    expect(response.output_text.indexOf('```html')).toBeLessThan(
      response.output_text.indexOf('```css')
    );
  });

  test('closes both fences', () => {
    const codeFenceCount = (response.output_text.match(/```/g) || []).length;
    expect(codeFenceCount).toEqual(4);
  });
});
