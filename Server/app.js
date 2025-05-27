require("dotenv").config();
require("express-async-errors");
const express = require("express");
const router = require("./routes/User");
const app = express();
const port = process.env.PORT || 5500;
const connectDB = require('./db/connect');
const auth = require('./middleware/auth');
const cors = require('cors');
const PlanRouter = require('./routes/Plans');
const AdminRouter = require('./routes/Admins');
const paymentRouter= require('./controllers/epay')
const path = require('path');
const profileRoutes = require('./controllers/Profile');
const helmet = require('helmet');
const emailRouter = require('./routes/sendEmail');

// Middleware
app.use(cors({
  origin: "http://localhost:5173", // Frontend URL
  methods: ["GET", "POST", "PUT", "DELETE"],
}));
app.use(helmet({ 
  crossOriginResourcePolicy: false, // Allow cross-origin resources
}));


app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: [
        "'self'",
        'https://js.stripe.com',
        'https://m.stripe.network',
        "'unsafe-inline'",
        "'unsafe-eval'",
      ],
    },
  })
);

app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads'), {
  setHeaders: (res) => {
    res.set("Access-Control-Allow-Origin", "http://localhost:5173");
  },
}));
app.use('/api/v1/gym', router);
app.use('/api/v1/gym', PlanRouter);
app.use('/api/v1/gym', profileRoutes);
app.use('/api/v1/gym', AdminRouter);
app.use('/api/v1/gym', auth, paymentRouter);
app.use('/api/v1/gym/send', emailRouter);

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () => console.log(`Server listening on port ${port}...`));
  } catch (error) {
    console.log(error);
  }
};

start();
