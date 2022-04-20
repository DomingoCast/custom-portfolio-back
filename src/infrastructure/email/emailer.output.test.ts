import Email from "../../core/ports/email/Email";
import { getTemplate, setUpEmail } from "./emailer.output";
import sgMail from "@sendgrid/mail";
import fs from "fs";
import path from "path";

jest.mock("fs", () => jest.fn());
fs.readFileSync = jest.fn((x: any): any => x);

jest.mock("@sendgrid/mail", () => jest.fn());

sgMail.setApiKey = jest.fn();
sgMail.send = <any>jest.fn(async () => await "casa");

describe("get template", () => {
    it("given a file, returns a template", () => {
        const file = "x";
        expect(getTemplate(file)).toBe(
            path.join(__dirname, `/template/${file}.html`)
        );
    });
});
describe("set up email", () => {
    it("given an emails, sends it", () => {
        const mockText = "x";
        const email: Email = {
            receiver: "",
            subject: "",
            text: mockText,
        };
        const msg = {
            to: email.receiver,
            from: "team-dha@outlook.com",
            subject: email.subject,
            text: "and easy to do anywhere, even with Node.js",
            html: getTemplate(email.text + ".sendgrid"),
        };
        const apiKey = "random";
        process.env.SENDGRID_API_KEY = apiKey;
        setUpEmail().send(email);
        expect(sgMail.setApiKey).toHaveBeenCalledWith(apiKey);
        expect(sgMail.send).toHaveBeenCalledWith(msg);
    });
});
