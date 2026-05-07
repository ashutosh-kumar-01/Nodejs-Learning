exports.passwordUpdated = (email, name) => {
    return `<!DOCTYPE html>
    <html>
    <head>
        <meta charset="UTF-8">
        <title>Password Update Confirmation</title>
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
            .support {
                font-size: 14px;
                color: #999999;
                margin-top: 20px;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="message">Password Update Confirmation</div>
            <div class="body">
                <p>Dear ${name},</p>
                <p>Your password has been successfully updated for the account associated with <span class="highlight">${email}</span>.</p>
                <p>If you did not request this password change, please contact us immediately to secure your account.</p>
            </div>
            <div class="support">If you have any questions or need assistance, please feel free to reach out to us at <a href="mailto:info@studyapp.com">info@studyapp.com</a>.</div>
        </div>
    </body>
    </html>`;
};
