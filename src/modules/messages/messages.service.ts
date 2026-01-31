import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Message } from './message.entity';

@Injectable()
export class MessagesService {
  constructor(@InjectRepository(Message) private repo: Repository<Message>) {}
  list() { return this.repo.find({ order: { timestamp: 'ASC' } }); }
  create(data: Partial<Message>) { return this.repo.save(this.repo.create(data)); }
}
