const mongoose = require("mongoose");

// Define the user schema
const userSchema = new mongoose.Schema({
  EmployeeName: {
    type: String,
    required: true // Ensure the name is required
  },
  phone: {
    type: String,
    required: true, // Ensure the phone number is required
    unique: true // Make sure phone numbers are unique
  },
  companyName: {
    type: String,
    required: true // Ensure the company name is required
  },
  companyEmail: {
    type: String,
    required: true, // Ensure the company email is required
    unique: true, // Make sure company emails are unique
    match: /.+\@.+\..+/ // Basic regex to validate email format
  },
  employeeSize: {
    type: String,
    required: true // Ensure the employee size is required
  }
});

// Create the model
const User = mongoose.model("User", userSchema);

// Export the model
module.exports = User;
