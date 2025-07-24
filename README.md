# CRUD APP

This project is a simple application with Login and CRUD functionality , built using React(Vite) for the frontend and Express(Node.js) for the backend , along with UI and API tests. Its features include:
- Login functionality( using username and password)
- Create a Todo item
- Edit a Todo item
- Delete a Todo item
- View the Todo items
- Playwright tests for UI and API automation

## Project Structure
-  '/frontend' - React + Vite frontend
-  '/backend'  - Express backend
-  '/playwright-tests/ui'  - UI tests for the application
-  '/playwright-tests/api'  - API tests for the application
-  '/.github/workflow'  -  The Github Action workflow file


## Getting Started

### Prerequisites
-  Node.js (v18+ recommended)
-  npm

###  Setup

####  1.  Install dependencies

Clone the repository https://github.com/suparnaneeraj/PlaywrightAutomation from Github and open the project in an IDE Example VS code)
From the root directory run the following commands:
-  `cd backend && npm install`
-  `cd frontend && npm install`
-  `cd playwright-tests && npm install`

####  2.  Run the backend

-  From the backend directory run the following commands:
- `npm start`
- The server will run on http://localhost:3001 by default.

####  3.  Run the frontend

-  From the frontend directory run the following commands:
-  `npm run dev`
-  The app will run on http://localhost:5173 by default

####  4. Run playwright tests

-  From the playwright-tests directory run the following commands:
-  To run the tests in headless mode use `npx playwright test`
-  Once test is finished, Html report will open in default browser (only if test failed)
-  To manually open report (on Pass), run `npm run report`
-  Video recording will be found under folder `test-result/<testcase-name>/video.webm`
-  To run the tests in UI mode use `npx playwright test --ui` and the Playwright UI would open up.

##  Notes
-   All tests are independent of each other.
-   The application is a basic app and all the functionality is not properly implemented. For example the app will allow to save empty Todo item and this test would always fail unless the issue in the app is fixed.
-   The sample test result is attached below.
-   <img width="1920" height="936" alt="image" src="https://github.com/user-attachments/assets/50eb6963-fb0b-46c2-9a37-c4d2ba730887" />

##  Limitations and Improvements
-  The credentials are currently saved in the .env file and is pushed to the repository. This can be also stored as secrets (in some vaults) and then provide scripts in the Github action workflow file to fetch the secrets
-  The test data is currently hard coded by appending a unique id.
-  More tests could be added to increase coverage.
-  The test framework is kept simple and clear as the functionality to test is basic.
