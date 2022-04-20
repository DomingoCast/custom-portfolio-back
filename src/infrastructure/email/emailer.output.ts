import path from "path";
import Email from "../../core/ports/email/Email";
import sgMail from "@sendgrid/mail";
import fs from "fs";
import EmailSender from "../../core/ports/email/send-email.port";

export const getTemplate = (file: string): string => {
    try {
        return fs.readFileSync(
            path.join(__dirname, `/template/${file}.html`),
            "utf8"
        );
    } catch {
        return "error";
    }
};

export const setUpEmail = (): EmailSender => {
    const sendEmail = async (
        email: Email,
        getTemplateFn = getTemplate
    ): Promise<void> => {
        const htmlFile = getTemplateFn(email.text + ".sendgrid");
        sgMail.setApiKey(process.env.SENDGRID_API_KEY!);
        const msg = {
            to: email.receiver,
            from: "team-dha@outlook.com",
            subject: email.subject,
            text: "and easy to do anywhere, even with Node.js",
            html: htmlFile,
        };
        sgMail
            .send(msg)
            .then(() => {
                console.log("Email sent");
            })
            .catch((error: any) => {
                console.error(error);
            });
    };

    return {
        send: (email: Email) => sendEmail(email),
    };
};
