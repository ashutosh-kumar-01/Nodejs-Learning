const mongoose = require('mongoose');
const nodemailer = require('nodemailer');

const fileSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        required: true
    },
    tags:{
        type: String,
    },
    email: {
        type: String,
    }
});

// post middleware 
fileSchema.post('save', async function(doc) {
    try {
        console.log("DOC",doc);
        // CREATE A TRANSPORTER
        const transporter = nodemailer.createTransport({
            host: process.env.MAIL_HOST,
            auth:{
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASS,
            },
        });

        // send mail
        let info = await transporter.sendMail({
            from: `Gmoludon ke traf se hai ya mail`,
            to: doc.email,
            subject: "New file uploaded",
            html: `<h2> Hello, Jii kaise hai aap log </h2>
            <p> Aapka file successfully upload ho chuka hai, jiska naam hai ${doc.imageUrl} </p>`,
        })
        console.log("Mail sent", info);

    } catch (error) {
        console.error(error);

    }
})

const File = mongoose.model('File', fileSchema);

module.exports = File;
