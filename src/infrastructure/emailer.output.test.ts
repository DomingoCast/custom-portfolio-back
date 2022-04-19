import Email from "../core/domain/email/Email";
import { setUpEmail } from "./email/emailer.output";

describe("emailer", () => {
    it("sends", () => {
        const emailSender = setUpEmail();
        expect(emailSender).toHaveProperty("send");
    });
    it("doest send email", async () => {
        const emailSender = setUpEmail();
        const email: Email = {
            receiver: "",
            subject: "",
            text: "",
        };
        const response = await emailSender.send(email);
        expect(response).toBe(false);
    });
});
