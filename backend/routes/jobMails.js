const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer'); // Ensure nodemailer is imported
require('dotenv').config();  // Make sure this is in the main file to load .env

// Assuming you have your transporter configured like you showed
const transporter = nodemailer.createTransport({
  service: 'gmail',
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.USER,
    pass: process.env.PASS, // App password
  },
});

// New route for sending job emails
router.post('/', async (req, res) => {
  const { jobTitle, jobDescription, experienceLevel, candidateEmails, endDate } = req.body;

  // Validate input
  if (!jobTitle || !jobDescription || !experienceLevel || !candidateEmails.length || !endDate) {
    return res.status(400).send("All fields are required.");
  }

  
  // Prepare the email content
  const mailOptions = {
    from: {
      name: "Cuvette",
      address: process.env.USER,
    },
    to: candidateEmails, // Send to all candidate emails
    subject: `Interview for ${jobTitle}`,
    text: `Dear Candidate,\n\nYou have been shortlisted for the ${jobTitle} position.\n\nDescription: ${jobDescription}\nExperience Level: ${experienceLevel}\nEnd Date: ${endDate}\n\nBest Regards,\nAmeer`,
    html: `<p>Dear Candidate,</p><p>You have been shortlisted for the <strong>${jobTitle}</strong> position.</p><p><strong>Description:</strong> ${jobDescription}</p><p><strong>Experience Level:</strong> ${experienceLevel}</p><p><strong>End Date:</strong> ${endDate}</p><p>Best Regards,<br>Ameer</p>`,
  };

  try {
    // Send emails
    await transporter.sendMail(mailOptions);
    console.log('Job emails sent successfully');
    res.status(200).send("Emails sent successfully.");
  } catch (error) {
    console.error('Error sending job emails:', error);
    res.status(500).send("Failed to send emails.");
  }
});

// Export your router
module.exports = router;
