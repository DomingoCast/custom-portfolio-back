import path from "path";
import Email from "../../core/ports/email/email";
import sgMail from "@sendgrid/mail";
import fs from "fs";
import EmailSender from "../../core/ports/email/send-email.port";
import CustomError from "../../core/errors/custom-error";

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
        const htmlFile = getTemplateFn(email.template + ".sendgrid");
        const segridApiKey = process.env.SENDGRID_API_KEY || "";
        sgMail.setApiKey(segridApiKey);
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
            .catch((error: unknown) => {
                if (error instanceof Error)
                    throw new CustomError(error.message);
                console.error(error);
            });
    };

    return {
        send: (email: Email) => sendEmail(email),
    };
};
