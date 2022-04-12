import Email from "../../domain/email/Email";
import EmailSender from "../../ports/send-email.port";

type sendEmailProps = {
    emailSender: EmailSender;
};
const sendEmail =
    ({ emailSender }: sendEmailProps): ((email: Email) => Promise<void>) =>
    async (email: Email): Promise<void> => {
        console.log(emailSender);
        await emailSender.send(email);
    };

export default sendEmail;
