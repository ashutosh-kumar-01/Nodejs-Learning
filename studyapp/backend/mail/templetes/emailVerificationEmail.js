exports.emailVerificationTemplate = (otp) => {
    return `<!DOCTYPE html>
    <html>
    <head>
        <meta charset="UTF-8">
        <title>Verify Your Email - StudyApp</title>
        <style>
            body {
                background-color: #f2f5f9;
                font-family: "Segoe UI", Arial, sans-serif;
                font-size: 16px;
                line-height: 1.6;
                color: #1f2937;
                margin: 0;
                padding: 0;
            }
            .container {
                max-width: 620px;
                margin: 0 auto;
                padding: 24px;
            }
            .card {
                background-color: #ffffff;
                border-radius: 16px;
                box-shadow: 0 10px 30px rgba(15, 23, 42, 0.08);
                overflow: hidden;
            }
            .header {
                background: linear-gradient(135deg, #0f172a 0%, #2563eb 50%, #22c55e 100%);
                color: #ffffff;
                padding: 28px 32px;
            }
            .brand {
                font-size: 18px;
                letter-spacing: 2px;
                text-transform: uppercase;
                opacity: 0.9;
            }
            .title {
                margin: 8px 0 0;
                font-size: 26px;
                font-weight: 700;
            }
            .content {
                padding: 28px 32px 32px;
            }
            .lead {
                font-size: 17px;
                color: #334155;
                margin: 0 0 16px;
            }
            .otp-wrap {
                background: #f8fafc;
                border: 1px dashed #cbd5f5;
                padding: 18px;
                border-radius: 12px;
                text-align: center;
                margin: 18px 0 22px;
            }
            .otp {
                font-size: 34px;
                font-weight: 700;
                letter-spacing: 8px;
                color: #1d4ed8;
            }
            .meta {
                font-size: 13px;
                color: #64748b;
                margin-top: 10px;
            }
            .cta {
                display: inline-block;
                padding: 12px 18px;
                background: #0f172a;
                color: #ffffff;
                text-decoration: none;
                border-radius: 10px;
                font-weight: 600;
            }
            .footer {
                text-align: center;
                font-size: 13px;
                color: #94a3b8;
                padding: 18px 24px 26px;
            }
            .footer a {
                color: #2563eb;
                text-decoration: none;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="card">
                <div class="header">
                    <div class="brand">StudyApp</div>
                    <div class="title">Verify your email</div>
                </div>
                <div class="content">
                    <p class="lead">Use this One-Time Password to finish creating your account.</p>
                    <div class="otp-wrap">
                        <div class="otp">${otp}</div>
                        <div class="meta">Valid for 5 minutes</div>
                    </div>
                    <p>If you did not request this code, you can safely ignore this email.</p>
                    <a class="cta" href="#">Open StudyApp</a>
                </div>
                <div class="footer">
                    Need help? Email <a href="mailto:info@studyapp.com">info@studyapp.com</a>
                </div>
            </div>
        </div>
    </body>
    </html>`;
};
