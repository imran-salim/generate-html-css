interface MockAIResponse {
    output_text: string;
}

class OpenAI {
  constructor(_: { apiKey?: string }) {}
  responses = {
    create: jest.fn<Promise<MockAIResponse>, [any]>(async (_opts: any) => {
      return {
        output_text: `\`\`\`html
<!DOCTYPE html>
<html>
  <head>
    <title>Test</title>
  </head>
  <body>
    <h1>Hello</h1>
  </body>
</html>
\`\`\`
\`\`\`css
body {
  font-family: system-ui, sans-serif;
  margin: 0;
  padding: 0;
}
h1 {
  color: #333;
}
\`\`\``,
      };
    }),
  };
}

export default OpenAI;
