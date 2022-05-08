import express from 'express';
import { createTransport } from 'nodemailer';
import { prisma } from './prisma';

const app = express();
app.use(express.json());

const transport = createTransport({
  host: 'smtp.mailtrap.io',
  port: 2525,
  auth: {
    user: process.env.NODEMAILER_USER,
    pass: process.env.NODEMAILER_PASS,
  },
});

app.post('/feedbacks', async (request, response) => {
  const { type, comment, screenshot } = request.body;

  await prisma.feedback.create({
    data: { type, comment, screenshot },
  });

  await transport.sendMail({
    subject: 'Feedback recebido',
    from: `Equipe FeedGet <${process.env.SENDER_EMAIL}>`,
    to: `Henrique Balardin <${process.env.RECEIVER_EMAIL}>`,
    html: [
      '<div style="display: flex; flex-direction: column; background-color: #7129c1; padding: 48px 24px; font-family: sans-serif; font-size: 16px; color: #fff;">',
      `<h1 style="margin: 0 auto 16px auto;">Novo feedback!</h1>`,
      `<p><b>Tipo do feedback:</b> ${type}</p>`,
      `<p><b>Comentário:</b> ${comment}</p>`,
      '</div>',
    ].join('\n'),
  });

  return response.status(201).send();
});

app.listen(3333, () => console.log('HTTP server is running! 🚀'));
