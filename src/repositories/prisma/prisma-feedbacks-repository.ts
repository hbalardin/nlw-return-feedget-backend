import {
  FeedbacksCreateData,
  FeedbacksRepository,
} from '../feedbacks-repository';
import { prisma } from '../../prisma';

export class PrismaFeedbacksRepository implements FeedbacksRepository {
  async create(data: FeedbacksCreateData) {
    await prisma.feedback.create({ data });
  }
}
