import sendEmail from "./send-email";

describe("regiter user case", () => {
    it("sends email", async () => {
        const email: any = null;
        const emailSender = {
            send: jest.fn(),
        };

        sendEmail(email, emailSender);

        expect(emailSender.send).toHaveBeenCalled();
    });
});
