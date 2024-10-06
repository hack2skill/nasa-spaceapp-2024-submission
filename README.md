
# NEXO: Near-Earth Object Tracker and Education Platform

NEXO is a platform dedicated to real-time tracking, visualization, and educational resources on Near-Earth Objects (NEOs), including asteroids and comets. The project is aimed at educating the public about NEOs, planetary defense, and space exploration while also providing tools for researchers and students to explore asteroid orbits and potential impact risks.

## Table of Contents
- [Introduction](#introduction)
- [Features](#features)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Usage](#usage)
- [Screenshots](#screenshots)
- [Technologies](#technologies)
- [Future Enhancements](#future-enhancements)
- [Contributing](#contributing)
- [License](#license)

## Introduction

In an era of increasing interest in space exploration and planetary defense, **NEXO** brings together real-time tracking of Near-Earth Objects (NEOs), educational resources, and impact deflection simulations. It provides users with a dynamic interface to explore asteroid data and visualize potential threats, such as potentially hazardous asteroids (PHAs), while also offering in-depth resources for learning about NEOs, their origins, and their significance in space science.

The project aims to bridge the gap between space discovery, education, and planetary safety.

## Features

- **Real-Time NEO Tracking**: Visualize the orbits of Near-Earth Objects, including asteroids and comets, based on up-to-date data.
- **Educational Content**: Detailed resources about NEOs, their history, formation, and significance in planetary defense.
- **Kinetic Impact Simulator**: A tool that lets users simulate the deflection of an asteroid using a kinetic impactor, calculating the change in trajectory.
- **NEO Orbit Visualization**: Dynamic, interactive visualizations showing asteroid orbits and potential risks.
- **User-Friendly Interface**: Intuitive navigation designed for students, space enthusiasts, and researchers alike.
- **NASA Integration**: Direct access to NASA resources and data on Near-Earth Objects.

## Project Structure

```
nexo-project/
│
├── src/
│   ├── components/         # React components for the app (header, slides, buttons)
│   ├── assets/             # Static assets like images, icons, etc.
│   ├── styles/             # CSS and styling files
│   └── App.js              # Main entry point for the app
│
├── public/
│   ├── index.html          # Main HTML template
│   └── images/             # Background images for the slides
│
├── README.md               # This file
├── package.json            # Project configuration and dependencies
├── .gitignore              # Files and directories to ignore in Git
└── LICENSE                 # Project license
```

## Installation

1. Clone the repository from GitHub:

   ```bash
   git clone https://github.com/yourusername/nexo-project.git
   ```

2. Navigate into the project directory:

   ```bash
   cd nexo-project
   ```

3. Install the required dependencies:

   ```bash
   npm install
   ```

4. Start the development server:

   ```bash
   npm start
   ```

5. Open your browser and go to `http://localhost:3000` to view the project.

## Usage

### 1. **NEO Tracking**
   - Explore the real-time orbits of NEOs using the interactive interface.
   - Zoom in and out to observe specific objects or see a wider space neighborhood.

### 2. **Kinetic Impact Simulator**
   - Enter asteroid and impactor parameters (mass, velocity, etc.) to simulate a kinetic deflection.
   - See how the asteroid’s orbit changes after the simulated impact.

### 3. **Educational Content**
   - Learn about the origins of NEOs, their characteristics, and their relevance in planetary defense.
   - Read through resources designed for students, educators, and space enthusiasts.

### 4. **NASA Resources**
   - Access real-time data on NEOs and asteroid impact risks.
   - Redirect to NASA’s official website for more detailed information.

## Screenshots

### Home Page:
![Home Page Screenshot](./screenshots/homepage.png)

### NEO Orbit Visualization:
![Orbit Visualization Screenshot](./screenshots/orbits.png)

### Kinetic Impact Simulator:
![Simulator Screenshot](./screenshots/simulator.png)

## Technologies

- **React.js**: Front-end framework for building the dynamic user interface.
- **CSS3**: For styling and animations.
- **NASA APIs**: Integration with NASA’s NEO data for real-time information.
- **JavaScript (ES6)**: Core logic for interaction and simulation.
- **HTML5**: Structural layout for the web app.

## Future Enhancements

- **Improved Visualizations**: More detailed visualizations of asteroid orbits using 3D models.
- **Additional Deflection Methods**: Expand simulations to include nuclear deflection, gravity tractors, and other deflection strategies.
- **Expanded Educational Content**: Include more advanced lessons and interactive quizzes for learning about NEOs and space science.
- **User Accounts**: Allow users to save simulation results, bookmark specific NEOs, and track their research.
- **NEO Alert System**: Implement a notification system for users to receive alerts about new potentially hazardous objects.

## Contributing

Contributions are welcome! If you would like to improve the project or add new features, follow these steps:

1. Fork the repository.
2. Create a new branch: `git checkout -b feature-newFeature`.
3. Make your changes and commit them: `git commit -m 'Add newFeature'`.
4. Push to the branch: `git push origin feature-newFeature`.
5. Open a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](./LICENSE) file for details.
