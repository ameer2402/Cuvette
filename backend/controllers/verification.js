const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();
const EmailOtp = require("../models/Otp");
const User = require("../models/user");
const { generateToken } = require("../middlewares/verifyToken");

router.post("/mail", async (req, res) => {
    const { email, emailOtp, formData } = req.body;

    try {
        const otpRecord = await EmailOtp.findOne({ email, otp: emailOtp });

        if (!otpRecord) {
            return res.status(400).send('Invalid or expired Email OTP.');
        }

        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({ message: 'User already exists.' });
        }

        const newUser = await User.create({
            EmployeeName: formData.EmployeeName,
            phone: formData.phone,
            companyName: formData.companyName,
            companyEmail: formData.companyEmail,
            employeeSize: formData.employeeSize,
        });

        const token =  await generateToken(newUser);
        if(!token){
            console.log("failed to generate token);
        }
        console.log("Setting cookie:", token); // Debug log

        // Set the token as a cookie with additional security options
        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "Strict",
            maxAge: 3600000,
        });

        await EmailOtp.deleteOne({ _id: otpRecord._id });

        res.status(200).json({ message: 'Email OTP verified successfully!' });
    } catch (error) {
        console.error('Error verifying Email OTP:', error);
        res.status(500).send('Error verifying Email OTP');
    }
});

module.exports = router;
