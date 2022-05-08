import { SubmitFeedbackUseCase } from './submit-feedback-use-case';

const createFeedbackSpy = jest.fn();
const sendMailSpy = jest.fn();

const submitFeedbackUseCase = new SubmitFeedbackUseCase(
  { create: createFeedbackSpy },
  { sendMail: sendMailSpy }
);

describe('Submit feedback', () => {
  it('should be able to submit a feedback', async () => {
    const data = {
      type: 'BUG',
      comment: 'Example comment',
      screenshot: 'data:image/png;base64,dashdisahd',
    };

    await expect(submitFeedbackUseCase.execute(data)).resolves.not.toThrow();

    expect(createFeedbackSpy).toHaveBeenCalled();
    expect(sendMailSpy).toHaveBeenCalled();
  });

  it('should not be able to submit a feedback without type', async () => {
    const data = {
      type: '',
      comment: 'Example comment',
      screenshot: 'data:image/png;base64,dashdisahd',
    };

    await expect(submitFeedbackUseCase.execute(data)).rejects.toThrow();
  });

  it('should not be able to submit a feedback without comment', async () => {
    const data = {
      type: 'BUG',
      comment: '',
      screenshot: 'data:image/png;base64,dashdisahd',
    };

    await expect(submitFeedbackUseCase.execute(data)).rejects.toThrow();
  });

  it('should not be able to submit a feedback with an invalid screenshot', async () => {
    const data = {
      type: 'BUG',
      comment: 'Example Comment',
      screenshot: 'not-an-image',
    };

    await expect(submitFeedbackUseCase.execute(data)).rejects.toThrow();
  });
});
