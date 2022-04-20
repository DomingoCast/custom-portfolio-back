import Email from "./Email";

interface EmailSender {
    send(email: Email): void;
}

export default EmailSender;
