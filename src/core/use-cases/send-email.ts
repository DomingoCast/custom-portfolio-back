import Email from "../domain/email/Email";
import EmailSender from "../ports/send-email.port";

const sendEmail = (email: Email, emailSender: EmailSender): void => {
    emailSender.send(email);
};

export default sendEmail;
