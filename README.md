# ChefGPT

ChefGPT is an AI-powered recipe generator that helps users create delicious recipes instantly. Simply describe what you want to cook, and ChefGPT generates a detailed recipe with ingredients, instructions, cooking time, cuisine type, and more.

## Features

* AI-powered recipe generation using Groq LLM
* JWT Authentication
* Google OAuth Authentication
* User Registration & Login
* Personal Cookbook
* Favorite Recipes
* Delete Recipes
* Search Recipes
* Share Recipes via WhatsApp
* Detailed Recipe View
* Protected Routes
* MongoDB Database Storage

## Tech Stack

### Frontend

* React
* React Router
* Axios
* Tailwind CSS
* Vite

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT Authentication
* bcryptjs

### AI

* Groq API
* Llama 3.3 70B Versatile

---

## Project Structure

```bash
ChefGPT/
│
├── frontend/
│   ├── src/
│   ├── public/
│   └── ...
│
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   └── ...
│
└── README.md
```

## Installation

### Clone Repository

```bash
git clone https://github.com/your-username/chefGPT.git
cd chefGPT
```

### Backend Setup

```bash
cd backend
npm install
```

### Configure Google Cloud Console
1. Create a project in Google Cloud Console.
2. Enable the Google Identity Services API.
3. Create OAuth 2.0 credentials.
4. Add authorized origins and redirect URIs.
5. Copy the Client ID and Client Secret into your .env file.

Create a `.env` file:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
GROQ_API_KEY=your_groq_api_key
JWT_SECRET=your_jwt_secret
GOOGLE_CLIENT_ID=your_google_client_id
```

Start backend:

```bash
npm run dev
```

### Frontend Setup

```bash
cd frontend
npm install
```

Create a `.env` file:

```env
VITE_API_URL=http://localhost:5000/api
VITE_GOOGLE_CLIENT_ID=your_google_client_id
```

Start frontend:

```bash
npm run dev
```

---

## Authentication

ChefGPT supports both JWT Authentication and Google OAuth 2.0 Authentication.

## Authentication Methods
### Email & Password Login

Users can register and log in using their email address and password. Passwords are securely hashed using bcryptjs before being stored in the database.

### Google Sign-In

Users can also sign in securely using their Google account through OAuth 2.0. Upon successful authentication, a JWT token is generated and used to access protected routes.

### Protected Features

* Generate Recipes
* View Cookbook
* Favorite Recipes
* Delete Recipes
* View Recipe Details

Users must authenticate using either Email/Password Login or Google Sign-In before accessing these features.

---

## Screenshots

### Login Page

![login image](./screenshots/login.png)

### Register Page

![register image](./screenshots/register.png)

### Home Page

![home page image](./screenshots/home.png)

### Cookbook Page

![cookbook image](./screenshots/cookbook.png)

### Recipe Detail Page

![register image](./screenshots/RecipeDetail.png)

---

## Future Improvements

* Recipe Images
* User Profiles
* Recipe Categories
* Advanced Filters
* Rate Limiting
* AI Image Generation

---

## Author

**Hariharasudhan D**

---

## License

This project is licensed under the MIT License.
