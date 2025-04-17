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
- **public/**:
    - css/
    - images/
    - jQuery/
    - index.html
    - resumeData.json

### Dependencies

The project relies on several key dependencies:

- **React**: A JavaScript library for building user interfaces.
- **React DOM**: For rendering React components in the DOM.
- **React Router**: For handling client-side routing.
- **React Intersection Observer**: For handling intersection events.
- **jQuery**: For DOM manipulation and AJAX requests.
- **React Scripts**: For running and building the React application.
- **Prettier**: For code formatting and consistency.

### Development Tools

- **ESLint**: For code linting and maintaining code quality
- **VSCode**: Recommended IDE with Prettier extension for formatting
- **Node.js**: Runtime environment (v16 required)

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
3. **Fill in the resumeData.json with your own info**

**NOTE**

- This project uses Node v16. See nvmrc.

## Contributing

### Adding New Components

1. Create new components in `src/components/`
2. Follow existing component patterns:
   - Use functional components with hooks
   - Implement proper prop types
   - Include necessary imports
   - Add ESLint disable comments where appropriate

### Styling Guidelines

1. CSS files are organized in `public/css/`:
   - `default.css`: Base styles and resets
   - `layout.css`: Main layout and component styles
   - `media-queries.css`: Responsive design rules

2. When adding new styles:
   - Follow the existing CSS structure
   - Use consistent naming conventions
   - Add responsive design considerations
   - Place styles in the appropriate CSS file
   - Use Prettier for formatting

3. Component-specific styles:
   - For new components, add styles to `layout.css`
   - Follow the existing class naming pattern
   - Include responsive design rules
   - Document any new classes in the component's comments

### Code Quality

- Use Prettier for consistent formatting
- Follow ESLint rules
- Add appropriate comments and documentation
- Test changes across different screen sizes
- Ensure accessibility standards are met

## Cloudflare Integrations

- Stored PDF in bucket on R2
- Use Worker to get a signedUrl
- This will allow for secure download, and the ability to upload a new resume without website redeployment

## Running

To run the project locally, use the following command:

```
    npm start
```

## Deployment

The project is deployed via Netlify. To deploy the project, follow these steps:

A deployed version can be found at [https://aaronfeingold-portfolio.netlify.app](https://aaronfeingold-portfolio.netlify.app).
