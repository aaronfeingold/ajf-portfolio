# Portfolio1

## Overview

This project is a personal portfolio website built using React. It showcases various projects, skills, and experiences. The website is designed to be responsive and visually appealing, providing a seamless user experience across different devices.

## Internal Mechanics

### Project Structure

The project follows a typical React application structure:

- **src/**: Contains the source code for the application.
  - **components/**: Reusable React components.
  - **pages/**: Different pages of the website.
  - **styles/**: CSS files for styling the components.
  - **assets/**: Images and other static assets.
- **App.js**: The main application component.
- **index.js**: The entry point of the application.

### Dependencies

The project relies on several key dependencies:

- **React**: A JavaScript library for building user interfaces.
- **React DOM**: For rendering React components in the DOM.
- **React Intersection Observer**: For handling intersection events.
- **jQuery**: For DOM manipulation and AJAX requests.
- **React Scripts**: For running and building the React application.
- **Testing Library**: For testing React components.
- **Web Vitals**: For measuring performance metrics.

### Scripts

The project includes several npm scripts for common tasks:

- `start`: Runs the development server.
- `build`: Builds the application for production.
- `test`: Runs the test suite.
- `eject`: Ejects the configuration files from react-scripts.

### ESLint Configuration

The project uses ESLint for code linting, with configurations extending from `react-app` and `react-app/jest`.

### Browserslist Configuration

The project specifies browser support for both production and development environments.

## Installation

To get started with the project, follow these steps:

1. **Clone the repository**:
   ```
   git clone https://github.com/your-username/your-repo-name.git
   ```
2. **Install dependencies**:
   ```
   npm install
   ```

## Running the Project

To run the project locally, use the following command:
```
    npm start
```
This will start the development server and open the application in your default web browser. The server will automatically reload the application whenever you make changes to the source code.

## Deployment

The project is deployed via Netlify. To deploy the project, follow these steps:

1. **Install Netlify CLI**:
```
    npm install -g netlify-cli
```
2. **Build the project**:
```
    npm run build
```
3. **Deploy to Netlify**:
```
    netlify deploy
```
   Follow the prompts to link the project to your Netlify account and deploy the site.

A deployed version can be found at [https://aaronfeingold-portfolio.netlify.app](https://aaronfeingold-portfolio.netlify.app).
