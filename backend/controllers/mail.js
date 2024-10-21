
  const nodemailer = require("nodemailer");
  const EmailOtp=require("../models/Otp");
  


  // Configure Nodemailer transporter for Gmail
  const transporter = nodemailer.createTransport({
    service: 'gmail', // Use Gmail service
    host: "smtp.gmail.com", // Corrected SMTP host
    port: 587,
    secure: false, // Use TLS (not SSL)
    auth: {
      user: "amee1432kky@gmail.com", // Your Gmail email address
      pass: "oqavtyezumlrpocd", // App password generated from your Google account
    },
  });

  // Function to send email with OTP
  const sendMail = async (req, res) => {
    const { email, otp } = req.body; // Get email and OTP from request body


    // Validate input: Check if both email and OTP are present
    if (!email || !otp) {
      return res.status(400).send("Email and OTP are required.");
    }

     // Store OTP in the database
  try {
    await EmailOtp.findOneAndUpdate(
      { email }, // Search for the email
      { otp },    // Update or set the new OTP
      { upsert: true, new: true } // Create new if not exists
    );
  } catch (error) {
    console.error("Error storing OTP:", error);
    return res.status(500).send("Failed to store OTP.");
  }

    const mailOptions = {
      from: {
        name: "Cuvette",
        address: "amee1432kky@gmail.com",
      },
      to: email, // Send email to the user provided in the request
      subject: "OTP for verification",
      text: `Your OTP is: ${otp}`, // Plain text email content
      html: `<b>Your OTP is: ${otp}</b>`, // HTML email content
    };

    try {
      // Send email using Nodemailer
      await transporter.sendMail(mailOptions);
      console.log(`OTP email sent to ${email}`); // Log success
      res.status(200).send("Email OTP sent successfully."); // Send success response
    } catch (error) {
      console.error("Error sending Email OTP:", error); // Log error
      res.status(500).send("Failed to send Email OTP."); // Send error response
    }
  };

  module.exports = sendMail; // Export the function
