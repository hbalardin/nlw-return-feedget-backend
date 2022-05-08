import express from 'express';
import { createTransport } from 'nodemailer';
import { PrismaFeedbacksRepository } from './repositories/prisma/prisma-feedbacks-repository';
import { SubmitFeedbacksUseCase } from './use-cases/submit-feedback-use-case';

export const routes = express.Router();

const transport = createTransport({
  host: 'smtp.mailtrap.io',
  port: 2525,
  auth: {
    user: process.env.NODEMAILER_USER,
    pass: process.env.NODEMAILER_PASS,
  },
});

routes.post('/feedbacks', async (request, response) => {
  const { type, comment, screenshot } = request.body;

  const prismaFeedbacksRepository = new PrismaFeedbacksRepository();
  const submitFeedbackUseCase = new SubmitFeedbacksUseCase(
    prismaFeedbacksRepository
  );

  await submitFeedbackUseCase.execute({ type, comment, screenshot });

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
