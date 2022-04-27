import Email from "./email";

interface EmailSender {
    send(email: Email): void;
}

export default EmailSender;
