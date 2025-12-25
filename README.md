# Messaging App Project

A real-time messaging application built with React, Firebase, and Cloudinary. This project includes a user-facing chat interface and a dedicated Admin dashboard for managing conversations.

## Features

### User Features
- **Authentication**: Sign up and Login with Email/Password or Google.
- **Real-time Chat**: Send and receive messages instantly.
- **Profile Management**:
    - Automatic profile picture from Google Auth.
    - **Upload Profile Picture**: Users can upload a custom profile picture (powered by Cloudinary) by clicking their avatar.
- **Responsive Design**: Optimized for both desktop and mobile devices.

### Admin Features
- **Dashboard**: View a list of all users and their last messages.
- **Real-time Updates**: Sidebar updates instantly when users send messages.
- **Unread Indicators**:
    - **Green/Bold** text in the sidebar indicates a new message from a User.
    - **Grey/Normal** text indicates the last message was sent by the Admin.
- **Messaging**: Reply to any user directly from the dashboard.

## Tech Stack

- **Frontend**: React (Vite), CSS
- **Backend / Database**: Firebase (Authentication, Firestore)
- **Image Storage**: Cloudinary
- **Admin Scripts**: Node.js (Firebase Admin SDK)

## Project Structure

- `messaging-app/`: Main React application.
    - `src/pages/`: Contains page components (`Chat.jsx`, `Adminpage.jsx`, `Signin.jsx`, etc.).
    - `src/Firebase/`: Firebase configuration.
- `admin/`: Backend scripts for administrative tasks.
    - `setAdmin.js`: Script to promote a user to Admin status.

## Setup Instructions

### 1. Main Application (`messaging-app`)

1.  Navigate to the project directory:
    ```bash
    cd messaging-app
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Run the development server:
    ```bash
    npm run dev
    ```

### 2. Admin Setup (`admin`)

To access the Admin Dashboard, a user must have the `admin` custom claim in Firebase.

1.  Navigate to the admin directory:
    ```bash
    cd admin
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  **Set Admin Privileges**:
    - Open `setAdmin.js`.
    - Replace the `uid` variable with the UID of the user you want to make an admin.
    - Run the script:
    ```bash
    node setAdmin.js
    ```
    - The console should output: `Success! Your account is now an admin.`

## Usage

1.  **User**: Register or Login. You will be redirected to the Chat page where you can message the Admin.
2.  **Admin**: Login with an admin-enabled account. You will be redirected to the Admin Dashboard (based on your custom claim) to view and reply to user chats.

## Configuration

- **Firebase**: configured in `src/Firebase/firebase-config.js`.
- **Cloudinary**: Credentials are set in `src/pages/Chat.jsx`:
    - Cloud Name: `Your Cloudinary Cloud Name`
    - Upload Preset: `Your Cloudinary Upload Preset`

🚀 Live Demo: 🔗 (https://webdeji-messaging-app.netlify.app/)

📬 Contact

Let’s connect!

LinkedIn: https://www.linkedin.com/in/olusanya-emmanuel-21546536a?

Whatsapp: https://wa.link/ad7t5w
