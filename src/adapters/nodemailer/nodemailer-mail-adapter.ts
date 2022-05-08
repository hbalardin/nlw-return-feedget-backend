import dotenv from 'dotenv';
import { createTransport } from 'nodemailer';
import { MailAdapter, SendMailData } from '../mail-adapter';

dotenv.config();

const transport = createTransport({
  host: 'smtp.mailtrap.io',
  port: 2525,
  auth: {
    user: process.env.NODEMAILER_USER,
    pass: process.env.NODEMAILER_PASS,
  },
});

export class NodemailerMailAdapter implements MailAdapter {
  async sendMail({ body, subject }: SendMailData) {
    await transport.sendMail({
      subject,
      from: `Equipe FeedGet <${process.env.SENDER_EMAIL}>`,
      to: `Henrique Balardin <${process.env.RECEIVER_EMAIL}>`,
      html: body,
    });
  }
}
