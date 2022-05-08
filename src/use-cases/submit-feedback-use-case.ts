import { MailAdapter } from '../adapters/mail-adapter';
import { FeedbacksRepository } from '../repositories/feedbacks-repository';

interface SubmitFeedbackUseCaseRequest {
  type: string;
  comment: string;
  screenshot?: string;
}

export class SubmitFeedbacksUseCase {
  constructor(
    private feedbacksRepository: FeedbacksRepository,
    private mailAdapter: MailAdapter
  ) {}

  async execute(request: SubmitFeedbackUseCaseRequest) {
    const { comment, type, screenshot } = request;

    await this.feedbacksRepository.create({ comment, type, screenshot });
    await this.mailAdapter.sendMail({
      subject: 'Feedback recebido',
      body: [
        '<div style="display: flex; flex-direction: column; background-color: #7129c1; padding: 48px 24px; font-family: sans-serif; font-size: 16px; color: #fff;">',
        `<h1 style="margin: 0 auto 16px auto;">Novo feedback!</h1>`,
        `<p><b>Tipo do feedback:</b> ${type}</p>`,
        `<p><b>Comentário:</b> ${comment}</p>`,
        '</div>',
      ].join('\n'),
    });
  }
}
