import ejs from "ejs";
import nodemailer from "nodemailer";
import path from "path";
import { envVars } from "../config/env";
import AppError from "../errorHelpers/appError";

const transporter = nodemailer.createTransport({
  secure: true,
  auth: {
    user: envVars.EMAIL_SENDER.SMTP_USER,
    pass: envVars.EMAIL_SENDER.SMTP_PASS,
  },
  port: Number(envVars.EMAIL_SENDER.SMTP_PORT),
  host: envVars.EMAIL_SENDER.SMTP_HOST,
});

interface SendEmailOptions {
  to: string;
  subject: string;
  templateName: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  templateDate?: Record<string, any>;
  attachments?: {
    filename: string;
    content: Buffer | string;
    contentType: string;
  }[];
}

export const sendEmail = async ({
  to,
  subject,
  templateName,
  templateDate,
  attachments,
}: SendEmailOptions) => {
  try {
    const templatePath = path.join(__dirname, `templates/${templateName}.ejs`);
    const html = await ejs.renderFile(templatePath, templateDate);
    const info = await transporter.sendMail({
      from: envVars.EMAIL_SENDER.SMTP_FROM,
      to: to,
      subject: subject,
      html: html,
      attachments: attachments?.map((attachments) => ({
        filename: attachments.filename,
        content: attachments.content,
        contentType: attachments.contentType,
      })),
    });
    console.log(`\u2709\uFE0F Email sent to ${to}: ${info.messageId}`);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.log("email sending error", error.message);

    throw new AppError(401, "Email error");
  }
};
