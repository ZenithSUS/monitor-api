import cron from 'node-cron';
import nodemailer from 'nodemailer';
import { db } from './firebase.js';
import { collection, getDocs } from 'firebase/firestore';

// Configure nodemailer
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.CRON_JOB_EMAIL,
    pass: process.env.CRON_JOB_APP_PASSWORD,
  },
});

// Function to send email
const sendEmail = (email, subject, text) => {
  const mailOptions = {
    from: 'jeranmerino147@gmail.com',
    to: email,
    subject: subject,
    text: text,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log('Error sending email:', error);
    } else {
      console.log('Email sent:', info.response);
    }
  });
};

// Schedule the cron job to run every minute
cron.schedule('* * * * *', async () => {
  try {
    const requirementsCollection = collection(db, 'Requirements');
    const requirementsSnapshot = await getDocs(requirementsCollection);
    const requirements = requirementsSnapshot.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));

    const today = new Date();

    requirements.forEach((requirement) => {
      const expiration = new Date(requirement.expiration);
      const remainingDays = Math.ceil((expiration - today) / (1000 * 60 * 60 * 24));

      if (remainingDays <= 7) {
        const email = requirement.personInCharge;
        const subject = 'Requirement Expiration Reminder';
        const text = `Dear ${requirement.personInCharge},\n\nYour requirement "${requirement.complianceList}" is expiring in ${remainingDays} days.\n\nPlease take the necessary actions.\n\nBest regards,\nYour Company`;

        sendEmail(email, subject, text);
      }
    });
  } catch (error) {
    console.log('Error in cron job:', error);
  }
});
