import Email from "../domain/email/Email";

interface EmailSender {
    send(email: Email): void;
}

export default EmailSender;
