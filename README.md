# Project Sortir

Project Sortir is an event management application that allows users to create activities, subscribe to events, and manage their participation. Developed as part of a team project during my formation, this application features an advanced filtering system, a map component to display event locations, and functionalities for users to delete, edit, subscribe, and unsubscribe from events.

## Table of Contents

1. [Introduction](#introduction)
2. [Features](#features)
3. [Demonstration](#demonstration)
4. [Getting Started](#getting-started)
5. [Architecture](#architecture)
6. [Technologies Used](#technologies-used)
7. [Project Structure](#project-structure)
8. [Project Status](#project-status)
9. [Contributions](#contributions)
10. [License](#license)
11. [Contact Information](#contact-information)

## Introduction

Project Sortir is designed to facilitate social interaction by enabling users to create and participate in events. The app's key features include a comprehensive filtering system, a map view to show event locations, and robust user management functionalities. It was built using React JS with Chakra UI for the frontend and Symfony with PHP for the backend.

## Features

- User authentication and profile management
- Event creation, editing, and deletion
- Advanced event filtering system
- Map component displaying event locations using Pigeon Maps and OpenCageData API
- Subscription management: subscribe, unsubscribe, and delete events
- Admin Page

## Demonstration

![Screenshot](https://github.com/Alin1233/project-sortir/blob/main/screenshots/Activity%20Creation.png?raw=true)
![Screenshot](https://github.com/Alin1233/project-sortir/blob/main/screenshots/Home%20Page.png?raw=true)
![Screenshot](https://github.com/Alin1233/project-sortir/blob/main/screenshots/My%20Profie.png?raw=true)


## Getting Started

### Prerequisites

- Web browser (e.g., Chrome, Firefox)
- Node.js and npm
- PHP and Symfony
- Wamp Server
- MySQL

### Installation

#### Backend Setup

1. Clone the backend repository:
    ```bash
    git clone https://github.com/yourusername/project-sortir-backend.git
    ```
2. Navigate to the backend directory:
    ```bash
    cd project-sortir-backend
    ```
3. Install dependencies using Composer:
    ```bash
    composer install
    ```
4. Set up the database:
    - Configure `config/packages/doctrine.yaml` with your MySQL database settings.
    - Run the migrations:
    ```bash
    php bin/console doctrine:migrations:migrate
    ```
5. Start the backend server:
    ```bash
    symfony server:start
    ```

#### Frontend Setup

1. Clone the frontend repository:
    ```bash
    git clone https://github.com/yourusername/project-sortir-frontend.git
    ```
2. Navigate to the frontend directory:
    ```bash
    cd project-sortir-frontend
    ```
3. Install dependencies using npm:
    ```bash
    npm install
    ```
4. Start the frontend development server:
    ```bash
    npm start
    ```

### Usage

- Open your web browser and navigate to `http://localhost:3000` to access the Project Sortir frontend.
- Register an account or log in to start creating and managing events.

## Architecture

Project Sortir is structured with a separate frontend and backend to handle different aspects of the application.

### Frontend

- **Framework**: React JS
- **UI Library**: Chakra UI
- **Map Component**: Pigeon Maps
- **API Interaction**: Axios

### Backend

- **Framework**: Symfony
- **Database**: MySQL (Wamp Server)
- **ORM**: Doctrine
- **Dependency Management**: Composer

### Diagrams

![Flowchart](https://github.com/yourusername/project-sortir/raw/main/frontend/public/images/flowchart.png)

## Technologies Used

- **Frontend Languages**: JavaScript, HTML, CSS
- **Frontend Framework**: React JS
- **UI Library**: Chakra UI
- **Map Library**: Pigeon Maps
- **API**: OpenCageData, Axios

- **Backend Languages**: PHP
- **Framework**: Symfony
- **Database**: MySQL
- **ORM**: Doctrine
- **Dependency Management**: Composer

## Project Structure

- **Frontend**: `project-sortir-frontend`
  - `src/` - Source code
  - `public/` - Static files
- **Backend**: `project-sortir-backend`
  - `src/` - Source code
  - `config/` - Configuration files
  - `migrations/` - Database migrations

## Project Status

Project Sortir is complete with all core features implemented. Future enhancements may include improving the UI/UX, adding real-time notifications, and integrating with external APIs for better event recommendations.

## Contributions

### Acknowledgements

This project was developed in collaboration with my training team. Special thanks to all team members for their dedication and hard work.

### Contributing Guidelines

If you wish to contribute to Project Sortir, please follow these guidelines:
1. Fork the repository.
2. Create a new branch for your feature or bug fix.
3. Submit a pull request with a detailed description of your changes.

## License

This project is licensed under the MIT License.

## Contact Information

For any inquiries, please contact [herciualin10@gmail.com](mailto:herciualin10@gmail.com) or connect with me on [LinkedIn](https://linkedin.com/in/alin-herciu-22a550284/).
