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
const sendEmail = (email, subject, text, html) => {
  const mailOptions = {
    from: process.env.CRON_JOB_EMAIL,
    to: email,
    subject: subject,
    text: text,
    html: html,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log('Error sending email:', error);
    } else {
      console.log('Email sent:', info.response);
    }
  });
};

// Schedule the cron job to run daily at 11:48 AM
cron.schedule('48 11 * * *', async () => {
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
      const frequency = requirement.frequencyOfCompliance;

      if (
        (remainingDays <= 15 && frequency === "Monthly") ||
        (remainingDays <= 90 && (frequency === "Annual" || frequency === "Semi Annual")) ||
        (remainingDays <= 30 && frequency === "Quarterly")
      ) {
        const email = requirement.personInCharge;
        const subject = 'Subscription Expiration Reminder';
        const text = `Dear ${requirement.personInCharge},\n\nYour subscription "${requirement.complianceList}" is expiring in ${remainingDays} days.\n\nPlease take the necessary actions.\n\nBest regards,\nYour Company`;
        const html = `
          <div style="font-family: Arial, sans-serif; line-height: 1.6;">
            <h2>Subscription Expiration Reminder</h2>
            <p>Dear ${requirement.personInCharge},</p>
            <p>Your subscription "<strong>${requirement.complianceList}</strong>" is expiring in ${remainingDays} days.</p>
            <p>Please take the necessary actions.</p>
            <p>Best regards,</p>
            <p>Your Company</p>
            <button style="background-color: #4CAF50; color: white; padding: 10px 20px; border: none; border-radius: 5px; cursor: pointer;">Click Me!</button>
          </div>
        `;

        sendEmail(email, subject, text, html);
        console.log("Send Successfully");
      }
    });
  } catch (error) {
    console.log('Error in cron job:', error);
  }
});
