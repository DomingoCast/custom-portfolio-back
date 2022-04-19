import Email from "../../core/domain/email/Email";
import EmailSender from "../../core/ports/send-email.port";

import nodemailer from "nodemailer";

// async..await is not allowed in global scope, must use a wrapper
export const setUpEmail = (): EmailSender => {
    const service = process.env.NODEMAILER_SERVICE;
    const sender = process.env.NODEMAILER_EMAIL;
    const password = process.env.NODEMAILER_PASSWORD;
    const transporter = nodemailer.createTransport({
        service: service,
        port: Number(process.env.NODEMAILER_PORT),
        secure: false,
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
