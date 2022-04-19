import Email from "../../domain/email/Email";
import EmailSender from "../../ports/send-email.port";

type sendEmailProps = {
    emailSender: EmailSender;
};
type SendEmail = (email: Email) => Promise<void>;
const sendEmailUseCase =
    ({ emailSender }: sendEmailProps): SendEmail =>
    async (email: Email): Promise<void> => {
        console.log(emailSender);
        await emailSender.send(email);
    };

export default sendEmailUseCase;
