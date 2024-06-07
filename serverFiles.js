const nodemailer = require("nodemailer");
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

const transporter = nodemailer.createTransport({
    service: "gmail",
    secure: true,
    port: 465,
    auth: {
        user: "test42fortytwo@gmail.com",
        pass: "fiqj xpmw nlrd pqov", // Ensure this is correct
    }
});

app.post('/send-email', (req, res) => {
    const { to, subject, text } = req.body;

    if (!to || !subject || !text) {
        return res.status(400).send({ error: "Missing required parameters: to, subject, text" });
    }

    const mailOptions = {
        from: "test42fortytwo@gmail.com",
        to,
        subject,
        text
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error(error);
            return res.status(500).send({ error });
        }
        console.log("Email sent: " + info.response);
        res.send({ success: "Email sent successfully" });
    });
});

const port = process.env.PORT || 8080;
const ip_address = process.env.IP_ADDRESS || "127.0.0.1";
app.listen(port, ip_address, () => {
    console.log(`Server running at http://localhost:${port}/`);
});
