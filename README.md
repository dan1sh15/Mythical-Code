# Mythical-Code

*Mythical-Code* is an innovative online coding platform designed for developers to write, execute, and experiment with code. The platform features a robust code editor, a Coding Arena for practice, and a Coding Battleground for competitive coding. Whether you're a beginner or an experienced coder, Mythical-Code provides the tools you need to enhance your coding skills and compete with others.

## Table of Contents
- [Introduction](#introduction)
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Technologies Used](#technologies-used)
- [Contributing](#contributing)
- [Credits](#credits)

## Introduction

*Mythical-Code* is a platform that enables users to write and execute code in a seamless environment. The platform supports at least one compiled language and is designed to be simple and intuitive, with no need for user management features like login or profile creation. The platform is divided into three main areas: the Code Editor, Coding Arena, and Coding Battleground.

## Features

- *Code Editor:*
  - A powerful code editor where users can write and execute code.
  - Currently supports c++ only.
  - Currently developing support for python.
  - Supports custom inputs and displays errors and outputs.

- *Coding Arena:*
  - A space where users can practice coding by solving predefined problems.
  - Admins can upload their own problems, complete with descriptions, and test cases.
  - In each problem there are two options  run on custom testcase  or submit . After submitting your code can be either accepted or failed when some hidden testcase do not passes.

- *Coding Battleground:*
  - A competitive environment where users can participate in coding contests.
  - Includes real-time leaderboards to showcase top performers.
  - It allows users to host their own contests.

## Installation

Follow these steps to set up the Mythical-Code platform locally:

1. *Clone the repository:*

    bash
    git clone https://github.com/dan1sh15/Mythical-Code.git
    

2. *Navigate to the project directory:*

    bash
    cd Mythical-Code
    

3. *Install dependencies:*

    - *Backend:*

    bash
    cd backend
    npm install
    

    - *Frontend:*

    bash
    cd ../frontend
    npm install
    

4. *Start the development server:*

    - *Backend:*

    bash
    cd backend
    node server.js
    

    - *Frontend:*

    bash
    cd ../frontend
    npm start
    

## Usage

Once the platform is set up:

- *Frontend:* Access the coding platform at http://localhost:3000.
- *Backend:* The backend server runs on http://localhost:8000.

Explore the different features by navigating through the Code Editor, Coding Arena, and Coding Battleground.

# Project Structure

The project is organized into two main components:
mythical-code/
│
├── backend/
| ├── config/
│ ├── controllers/
| ├── compiler/
| ├── middlewares/
│ ├── models/
│ ├── routes/
│ ├── utils/
│ └── server.js
│
├── frontend/
│ ├── src/
│ ├── public/
│ └── package.json
│
└── README.md


## Technologies Used

- *Frontend:* HTML, CSS, JavaScript, React
- *Backend:* Node.js, Express.js, MongoDB
- *Deployment:* Still in development

## Mobile App

Currently in development


## Contributing

Contributions are welcome! If you want to contribute:

1. Fork the repository.
2. Create a new branch (git checkout -b feature/your-feature).
3. Make your changes and commit them (git commit -m 'Add feature').
4. Push to the branch (git push origin feature/your-feature).
5. Open a pull request.



## Credits

- *Author:* Mohammad Danish
- *Contributors:* Skand Yadav, Chirag Kumar