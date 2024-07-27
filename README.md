# Shashank Backend Assignment

## Getting Started

To start the project, follow these steps:

1. **Download and Extract:**
   - Download the zip file and extract its contents.

2. **Install Dependencies:**
   - Navigate to both the backend and frontend folders and run the following command to install the necessary dependencies:

     ```sh
     npm i
     ```

3. **Configure MongoDB URL:**
   - Open the `index.js` file in the backend folder and add your MongoDB URL. This step is necessary due to security reasons; we do not push sensitive information like the MongoDB URL to the repository.

4. **Start the Backend Server:**
   - Navigate to the backend folder:

     ```sh
     cd backend
     ```

   - Start the backend server using the following command:

     ```sh
     nodemon index.js
     ```

5. **Start the Frontend Server:**
   - Navigate to the blog-app folder:

     ```sh
     cd blog-app
     ```

   - Start the frontend server using the following command:

     ```sh
     npm run dev
     ```

## Authentication

- This project uses JWT (JSON Web Tokens) for authentication.
