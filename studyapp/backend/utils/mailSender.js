const nodemailer = require('nodemailer');

const mailSender = async (email, title, body) =>{
    try {
        // CREATE A TRANSPORTER
        let transporter = nodemailer.createTransport({
            host: process.env.MAIL_HOST,
            auth:{
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASS,
            },
        });

        // send mail
        let info = await transporter.sendMail({
            from: `Study App ke traf se hai ya mail`,
            to: `${email}`,
            subject: `${title}`,
            html: `${body}`,
        })
        console.log(info);
        return info;
    } catch (error) {
        console.error('Error sending email:', error);
    }
}

module.exports = mailSender;