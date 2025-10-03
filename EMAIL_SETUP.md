# Email Configuration Setup

To enable email functionality in your healthcare application, you need to configure the following environment variables:

## Required Environment Variables

Create a `.env` file in the `server` directory with the following variables:

```env
# Database
MONGODB_URI=mongodb://localhost:27017/healthcare-mern

# JWT
JWT_SECRET=your-super-secret-jwt-key-here

# Email Configuration
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
CLIENT_URL=http://localhost:3000

# Server
PORT=5000
NODE_ENV=development
```

## Gmail Setup (Recommended)

1. **Enable 2-Factor Authentication** on your Gmail account
2. **Generate an App Password**:
   - Go to Google Account settings
   - Security → 2-Step Verification → App passwords
   - Generate a new app password for "Mail"
   - Use this password as `EMAIL_PASS`

## Alternative Email Services

You can use other email services by modifying the transporter configuration in `server/utils/emailService.js`:

### Outlook/Hotmail
```javascript
const transporter = nodemailer.createTransporter({
  service: 'hotmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});
```

### Custom SMTP
```javascript
const transporter = nodemailer.createTransporter({
  host: 'your-smtp-server.com',
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});
```

## Features Included

- ✅ User registration with email verification
- ✅ Welcome emails for new users
- ✅ Password reset functionality
- ✅ Email verification resend
- ✅ Profile management with comprehensive user data
- ✅ JWT authentication with enhanced security
- ✅ Password change functionality

## Testing Email Configuration

You can test your email configuration by running:

```bash
cd server
node -e "
import { testEmailConfig } from './utils/emailService.js';
testEmailConfig().then(result => console.log('Email config test:', result));
"
```

## Troubleshooting

1. **"Invalid login" error**: Check your email credentials and app password
2. **"Connection timeout"**: Verify your internet connection and SMTP settings
3. **"Authentication failed"**: Ensure 2FA is enabled and app password is correct
4. **Emails not received**: Check spam folder and email address spelling

## Security Notes

- Never commit your `.env` file to version control
- Use strong, unique passwords for email accounts
- Regularly rotate your app passwords
- Consider using environment-specific email services for production
