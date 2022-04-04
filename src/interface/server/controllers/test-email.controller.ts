import { privateEncrypt } from "crypto";
import Email from "../../../core/domain/email/Email";
import sendEmail from "../../../core/use-cases/send-email";
import { setUpEmail } from "../../../infrastructure/emailer.output";

const testEmail = async (data: any) => {
    const email: Email = {
        receiver: data.receiver,
        subject: data.subject,
        text: data.text,
    };
    console.log(email);
    console.log(
        process.env.NODEMAILER_SERVICE!,
        process.env.NODEMAILER_EMAIL!,
        process.env.NODEMAILER_PASSWORD!
    );

    const emailSender = await setUpEmail(
        process.env.NODEMAILER_SERVICE!,
        process.env.NODEMAILER_EMAIL!,
        process.env.NODEMAILER_PASSWORD!
    );

    sendEmail(email, emailSender);
};

export default testEmail;
