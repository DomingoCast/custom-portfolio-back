import Email from "../../domain/email/Email";
import EmailSender from "../../ports/send-email.port";

const sendEmail =
    ({ emailSender }: { emailSender: EmailSender }) =>
    async (email: Email): Promise<void> => {
        console.log(emailSender);
        await emailSender.send(email);
    };

export default sendEmail;
