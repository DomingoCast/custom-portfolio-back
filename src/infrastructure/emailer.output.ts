import Email from "../core/domain/email/Email";
import EmailSender from "../core/ports/send-email.port";

const nodemailer = require("nodemailer");

// async..await is not allowed in global scope, must use a wrapper
export const setUpEmail = async (
    service: string,
    sender: string,
    password: string
): Promise<EmailSender> => {
    const transporter = nodemailer.createTransport({
        service: service,
        auth: {
            user: sender,
            pass: password,
        },
    });

    const sendEmail = async (email: Email): Promise<void> => {
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
        send: (email: Email) => sendEmail(email),
    };
};
