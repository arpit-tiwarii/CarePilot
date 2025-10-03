import nodemailer from 'nodemailer';
import { logger } from './logger.js';

// Create transporter
const createTransporter = () => {
  return nodemailer.createTransporter({
    service: 'gmail', // You can change this to other services
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });
};

// Email templates
const emailTemplates = {
  welcome: (user) => ({
    subject: 'Welcome to CarePilot Healthcare System',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #059669;">Welcome to CarePilot!</h2>
        <p>Hello ${user.username},</p>
        <p>Thank you for registering with CarePilot Healthcare System. Your account has been successfully created.</p>
        <p>You can now:</p>
        <ul>
          <li>Track your symptoms and health data</li>
          <li>View your health analytics and trends</li>
          <li>Manage your profile information</li>
          <li>Access personalized health insights</li>
        </ul>
        <p>If you have any questions, please don't hesitate to contact our support team.</p>
        <p>Best regards,<br>The CarePilot Team</p>
      </div>
    `
  }),
  
  emailVerification: (user, verificationToken) => ({
    subject: 'Verify Your Email - CarePilot',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #059669;">Email Verification Required</h2>
        <p>Hello ${user.username},</p>
        <p>Please verify your email address by clicking the button below:</p>
        <div style="text-align: center; margin: 30px 0;">
          <a href="${process.env.CLIENT_URL || 'http://localhost:3000'}/verify-email?token=${verificationToken}" 
             style="background-color: #059669; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; display: inline-block;">
            Verify Email Address
          </a>
        </div>
        <p>If the button doesn't work, copy and paste this link into your browser:</p>
        <p style="word-break: break-all; color: #666;">
          ${process.env.CLIENT_URL || 'http://localhost:3000'}/verify-email?token=${verificationToken}
        </p>
        <p>This link will expire in 24 hours.</p>
        <p>Best regards,<br>The CarePilot Team</p>
      </div>
    `
  }),
  
  passwordReset: (user, resetToken) => ({
    subject: 'Password Reset - CarePilot',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #059669;">Password Reset Request</h2>
        <p>Hello ${user.username},</p>
        <p>You requested a password reset for your CarePilot account. Click the button below to reset your password:</p>
        <div style="text-align: center; margin: 30px 0;">
          <a href="${process.env.CLIENT_URL || 'http://localhost:3000'}/reset-password?token=${resetToken}" 
             style="background-color: #059669; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; display: inline-block;">
            Reset Password
          </a>
        </div>
        <p>If the button doesn't work, copy and paste this link into your browser:</p>
        <p style="word-break: break-all; color: #666;">
          ${process.env.CLIENT_URL || 'http://localhost:3000'}/reset-password?token=${resetToken}
        </p>
        <p>This link will expire in 1 hour.</p>
        <p>If you didn't request this password reset, please ignore this email.</p>
        <p>Best regards,<br>The CarePilot Team</p>
      </div>
    `
  })
};

// Send email function
export const sendEmail = async (to, templateName, data) => {
  try {
    const transporter = createTransporter();
    const template = emailTemplates[templateName];
    
    if (!template) {
      throw new Error(`Email template '${templateName}' not found`);
    }
    
    const emailContent = template(data);
    
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to,
      subject: emailContent.subject,
      html: emailContent.html
    };
    
    const result = await transporter.sendMail(mailOptions);
    logger.info(`Email sent successfully to ${to}: ${result.messageId}`);
    return { success: true, messageId: result.messageId };
  } catch (error) {
    logger.error('Email sending failed:', error);
    return { success: false, error: error.message };
  }
};

// Test email configuration
export const testEmailConfig = async () => {
  try {
    const transporter = createTransporter();
    await transporter.verify();
    logger.info('Email configuration is valid');
    return true;
  } catch (error) {
    logger.error('Email configuration test failed:', error);
    return false;
  }
};
