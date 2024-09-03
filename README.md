# Portfolio

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
- **public/**: index.html, data, CSS (font-awsome, defaults, layout), images, and jQuery


### Dependencies

The project relies on several key dependencies:

- **React**: A JavaScript library for building user interfaces.
- **React DOM**: For rendering React components in the DOM.
- **React Intersection Observer**: For handling intersection events.
- **jQuery**: For DOM manipulation and AJAX requests.
- **React Scripts**: For running and building the React application.

### Scripts

The project includes several npm scripts for common tasks:

- `start`: Runs the development server.
- `build`: Builds the application for production.
- `test`: Runs the test suite.
- `eject`: Ejects the configuration files from react-scripts.

### ESLint Configuration

The project uses ESLint for code linting, with configurations extending from `react-app` and `react-app/jest`.

## Installation

To get started with the project, follow these steps:

1. **Clone the repository**:
   ```
   git clone https://github.com/aaronfeingold/ajf-portfolio
   ```
2. **Install dependencies**:
   ```
   npm install
   ```

**NOTE**
- This project uses Node v16
- Configuration for nv is included

## Running

To run the project locally, use the following command:
```
    npm start
```

## Deployment

The project is deployed via Netlify. To deploy the project, follow these steps:

A deployed version can be found at [https://aaronfeingold-portfolio.netlify.app](https://aaronfeingold-portfolio.netlify.app).
