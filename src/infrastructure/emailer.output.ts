import Email from "../core/domain/email/Email";

const nodemailer = require("nodemailer");

// async..await is not allowed in global scope, must use a wrapper
export const setUpEmail = async (
    service: string,
    sender: string,
    password: string
) => {
    // create reusable transporter object using the default SMTP transport
    const transporter = nodemailer.createTransport({
        service: "hotmail",
        auth: {
            user: "team-dha@outlook.com", // generated ethereal user
            pass: "teamdha5432", // generated ethereal password
        },
    });

    const sendEmail = async (email: Email) => {
        console.log(email);
        const info = await transporter.sendMail({
            from: sender,
            to: email.receiver,
            subject: email.subject,
            text: email.text,
        });
        console.log("Message sent: %s", info.messageId);
        console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    };

    return {
        transporter,
        send: (email: Email) => sendEmail(email),
    };
};
