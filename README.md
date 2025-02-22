# Power Physical Fitness

A modern fitness application built with React and Node.js, designed to help users achieve their fitness goals through personalized workout plans and tracking.

## 🚀 Features

- User authentication and profile management
- Personalized workout plans
- Progress tracking
- Payment integration with Stripe
- Responsive design for all devices

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v18 or higher)
- npm (Node Package Manager)
- MongoDB (for database)

## 🛠️ Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Aashrya77/Power-Physical-Fitness.git
   cd Power-Physical-Fitness
   ```

2. **Setup the frontend**
   ```bash
   cd App
   npm install
   npm run dev
   ```

3. **Start the backend**
   ```bash
   cd Server
   npm install
   npm start
   ```

4. **Environment variables**
   - Create a `.env` file in the `Server` directory
   - Add the following variables:
     - `MONGODB_URI`: MongoDB connection string
     - `JWT_SECRET`: Secret key for JWT token
     - `STRIPE_SECRET_API_KEY`: Stripe secret API key
     - `ESEWA_MERCHANT_CODE`: eSewa merchant code
     - `ESEWA_SECRET_KEY`: eSewa secret key
     - `ESEWA_TEST_URL`: eSewa test URL
     - `ESEWA_STATUS_URL`: eSewa status URL
     - `SUCCESS_URL`: Success URL after payment
     - `FAILURE_URL`: Failure URL after payment
   - Replace the placeholders with your actual values


## 🛠️ Tech Stack

### Frontend
- React
- GSAP for animations
- Axios for API calls
- React Icons
- Vite
- React Router DOM
- React Icons

### Backend
- Node.js
- Express
- MongoDB
- Stripe
- eSewa
- JWT for authentication
- Bcrypt for password hashing
- Multer for file uploads

## 📞 Contact
- Email: aashryasigdel0@gmail.com
- Linkedin: https://www.linkedin.com/in/aashrya-sigdel-780261335/
Project Link: https://github.com/Aashrya77/Power-Physical-Fitness
