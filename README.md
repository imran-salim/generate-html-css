# Generate HTML & CSS

This is a Node.js web application for generating HTML and CSS code snippets. It provides a simple interface for users to create, preview, and download HTML/CSS code for their projects.

## Features

- Generate custom HTML and CSS code
- Live preview of generated code
- Download code snippets
- User-friendly interface

## Project Structure

- `app.js` – Main application file
- `bin/www` – Application startup script
- `public/` – Static assets
	- `images/` – Image files
	- `javascripts/` – Client-side JavaScript
	- `stylesheets/style.css` – Main stylesheet
- `routes/index.js` – Application routes
- `views/` – Pug templates
	- `layout.pug` – Base layout
	- `index.pug` – Home page
	- `error.pug` – Error page

## Getting Started
### OpenAI API Key

This application requires an OpenAI API key to generate HTML and CSS code using AI features.

#### How to set up:

1. Obtain your API key from https://platform.openai.com/account/api-keys
2. Create a `.env` file in the project root (if not already present).
3. Add the following line to your `.env` file:
	```env
	OPENAI_API_KEY=your_api_key_here
	```
4. Restart the application after setting the key.

Without a valid API key, AI-powered code generation features will not work.
### Prerequisites

- Node.js (v14 or higher recommended)
- npm

### Installation

1. Clone the repository:
	 ```sh
	 git clone https://github.com/imran-salim/generate-html-css.git
	 cd generate-html-css
	 ```
2. Install dependencies:
	 ```sh
	 npm install
	 ```

### Running the App

Start the development server:

```sh
npm start
```

The app will be available at `http://localhost:3000`.

## Usage

1. Open the app in your browser.
2. Use the interface to generate HTML and CSS code.
3. Preview the code live.
4. Download the generated code as needed.

## License

This project is licensed under the MIT License. See the `LICENSE` file for details.

## Author

Imran Salim
