import AdminEmail from "./admin-email";
import Email from "./email";

interface EmailSender {
    send(email: Email): void;
    sendAdmin(email: AdminEmail): void;
}

export default EmailSender;
