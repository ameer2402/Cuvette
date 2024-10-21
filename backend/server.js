const dotenv = require('dotenv');
const express=require("express");

const mongoose=require("mongoose");
const nodemailer = require('nodemailer');
const cookieParser = require('cookie-parser');
// const twilio = require('twilio');
const cors = require("cors");
const crypto = require('crypto');

const User=require("./models/user");
const sendMail=require("./controllers/mail");
// const phone=require("./controllers/phone");
const verification=require("./controllers/verification");
const jobMails=require("./routes/jobMails");
const {cookieValidation}=require("./middlewares/cookeiValidation");

dotenv.config();
const PORT=process.env.PORT || 5000;

const app=express();

app.use(cors({
  origin: true,  // Allow all origins
  credentials: true,  // Allow cookies to be sent
}));

// Use middleware
app.use(cookieParser());
app.use(express.json());



mongoose.connect(process.env.MONGO_URL)
  .then(() => {
    console.log("MongoDB connected successfully");
  })
  .catch(err => {
    console.error("MongoDB connection error:", err);
  });

  app.get("/create-interview",cookieValidation,(req,res)=>{
   res.status(200);
  });


app.get("/home", cookieValidation, (req, res) => {
  if (req.user) {
      // Send valid JSON response
      res.json({
          success: true,
          user: req.user, // Assuming req.user has the necessary user details
      });
  } else {
      // Send a 401 Unauthorized with a JSON message
      res.status(401).json({ success: false, message: "Unauthorized, no user" });
  }
});

// Logout endpoint to clear the token cookie
app.post("/logout", (req, res) => {
  res.clearCookie('token'); // Replace 'token' with your actual cookie name
  res.status(200).json({ message: "Logout successful" });
});




 
 app.post("/send-email-otp",sendMail);
//  app.post("/send-phone-otp",phone);
 app.use("/verify",verification);
 app.use("/send-job-emails",cookieValidation,jobMails);

app.listen(PORT,()=>{
  console.log(`server started at port ${PORT}`)
});
