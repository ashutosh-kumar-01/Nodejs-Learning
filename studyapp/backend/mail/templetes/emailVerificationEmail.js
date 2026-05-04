exports.emailVerificationTemplate = (otp) => {
    return `<!DOCTYPE html>
    <html>
    <head>
        <meta charset="UTF-8">
        <title>OTP Verification Email</title>
        <style>
            body {
                background-color: #f4f4f4;
                font-family: Arial, sans-serif;
                font-size: 16px;
                line-height: 1.4;
                color: #333333;
                margin: 0;
                padding: 0;
            }
            .container {
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
                text-align: center;
            }
            .message {
                font-size: 24px;
                font-weight: bold;
                margin-bottom: 20px;
                color: #333;
            }
            .body {
                font-size: 16px;
                margin-bottom: 20px;
                background-color: #ffffff;
                padding: 30px;
                border-radius: 8px;
                box-shadow: 0 4px 8px rgba(0,0,0,0.05);
                text-align: left;
            }
            .highlight {
                font-weight: bold;
                color: #007bff;
            }
            .otp-container {
                text-align: center;
                margin: 30px 0;
            }
            .otp {
                font-size: 32px;
                font-weight: bold;
                letter-spacing: 6px;
                color: #007bff;
                background: #f0f7ff;
                padding: 15px 30px;
                border-radius: 8px;
                display: inline-block;
            }
            .support {
                font-size: 14px;
                color: #999999;
                margin-top: 20px;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="message">Verify Your Email Address</div>
            <div class="body">
                <p>Hello,</p>
                <p>Thank you for signing up with us! To complete your registration and verify your email address, please use the following One-Time Password (OTP):</p>
                <div class="otp-container">
                    <span class="otp">${otp}</span>
                </div>
                <p>This OTP is valid for the next 5 minutes. If you did not request this verification, please disregard this email.</p>
            </div>
            <div class="support">If you have any questions or need assistance, please feel free to reach out to us at <a href="mailto:info@studyapp.com">info@studyapp.com</a>.</div>
        </div>
    </body>
    </html>`;
};
