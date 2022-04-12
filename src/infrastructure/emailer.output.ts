import Email from "../core/domain/email/Email";
import EmailSender from "../core/ports/send-email.port";

const nodemailer = require("nodemailer");

// async..await is not allowed in global scope, must use a wrapper
export const setUpEmail = (
    service: string,
    sender: string,
    password: string
): EmailSender => {
    const transporter = nodemailer.createTransport({
        service: service,
        auth: {
            user: sender,
            pass: password,
        },
    });

    const sendEmail = async (email: Email): Promise<boolean> => {
        console.log(email);
        return transporter
            .sendMail({
                from: sender,
                to: email.receiver,
                subject: email.subject,
                text: email.text,
            })
            .then(() => true)
            .catch(() => false);
    };

    return {
        send: (email: Email) => sendEmail(email),
    };
};
