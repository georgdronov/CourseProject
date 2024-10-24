# Web application for customisable forms

## Description
Quizzes, tests, questionnaires, polls, etc.

### Task
- [x] The application is deployed and connected to the database
- [x] You can create a form in the form builder
- [x] You can change the order of questions using drag and drop
- [x] You can add more than four questions
- [x] You can save the completed form
- [x] On the main page, you can view all forms with pagination
- [x] On the main page, you can delete a form
- [x] On the main page, you can select a form and edit it
- [ ] You can save the edited form
- [ ] You can fill out the created form
- [ ] Authorization
- [ ] You can view responses to the filled-out form

### Deploy
- **render.com for Node.js and DB** 
[courseproject-5nrc.onrender.com](https://courseproject-5nrc.onrender.com)

- **Vercel for React**
[https://course-project-rust-seven.vercel.app/](https://course-project-rust-seven.vercel.app/)

### Backend
The backend is built using **Node.js** and leverages the following libraries:
- **Express**: A fast, minimalist web framework for Node.js.
- **dotenv**: Loads environment variables from a `.env` file into `process.env`.
- **pg**: For connect to DB
- **axios**  : For HTTP requests
- **сors** :  For CORS headers

### Frontend
The frontend is built using **React** and leverages the following libraries:
- **react-router-dom**: For routing in React applications.
- **bootstrap**: A popular CSS framework for responsive design.
- **react-bootstrap**: Provides Bootstrap components as React components.
- **@hello-pangea/dnd**: For drag-and-drop functionality.
- **uid**: For generating unique IDs.
