import Email from "../../domain/email/Email";

const sendEmail =
    ({ emailSender }: any) =>
    async (email: Email): Promise<void> => {
        console.log(emailSender);
        await emailSender.send(email);
    };

export default sendEmail;
