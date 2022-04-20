import Email from "../../core/domain/email/Email";
import EmailSender from "../../core/ports/send-email.port";

const sgMail = require("@sendgrid/mail");
const sendgrid = require("sendgrid");
const fs = require("fs");

const base64_encode = (file: string) => {
    var bitmap = fs.readFileSync(__dirname + file);
    const base64img = Buffer.from(bitmap).toString("base64");
    // console.log("[IMG]", base64img);
    return base64img;
};
export const setUpEmail = (): EmailSender => {
    // const service = process.env.NODEMAILER_SERVICE;
    // const sender = process.env.NODEMAILER_EMAIL;
    // const password = process.env.NODEMAILER_PASSWORD;
    // let transporter = nodemailer.createTransport({
    //     service: service,
    //     port: Number(process.env.NODEMAILER_PORT),
    //     secure: false,
    //     auth: {
    //         user: sender,
    //         pass: password,
    //     },
    // });

    const getTemplate = (file: string): string => {
        console.log("[FILE]", file);
        try {
            return fs.readFileSync(
                __dirname + `/template/${file}.html`,
                "utf8"
            );
        } catch {
            return "error";
        }
    };

    const sendEmail = async (email: Email): Promise<void> => {
        const htmlFile = getTemplate(email.text + ".sendgrid");
        sgMail.setApiKey(process.env.SENDGRID_API_KEY);
        const msg = {
            to: email.receiver, //"castillomartidomenge2@gmail.com", // Change to your recipient
            from: "team-dha@outlook.com", // Change to your verified sender
            subject: email.subject,
            text: "and easy to do anywhere, even with Node.js",
            html: htmlFile,
            // files: [
            //     {
            //         filename: "image-1.png",
            //         contentType: "image/png",
            //         cid: "img1",
            //         content: base64_encode("/template/images/image-1.png"),
            //         disposition: "inline",
            //     },
            //     {
            //         filename: "image-2.png",
            //         contentType: "image/png",
            //         cid: "img2",
            //         content: base64_encode("/template/images/image-2.png"),
            //         disposition: "inline",
            //     },
            //     {
            //         filename: "image-3.png",
            //         contentType: "image/png",
            //         cid: "img3",
            //         content: base64_encode("/template/images/image-3.png"),
            //         disposition: "inline",
            //     },
            //     {
            //         filename: "image-4.png",
            //         contentType: "image/png",
            //         cid: "img4",
            //         content: base64_encode("/template/images/image-4.png"),
            //         disposition: "inline",
            //     },
            //     {
            //         filename: "image-5.jpeg",
            //         contentType: "image/jpeg",
            //         cid: "img5",
            //         content: base64_encode("/template/images/image-5.jpeg"),
            //         disposition: "inline",
            //     },
            //     {
            //         filename: "image-6.png",
            //         contentType: "image/png",
            //         cid: "img6",
            //         content: base64_encode("/template/images/image-6.png"),
            //         disposition: "inline",
            //     },
            // ],
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
