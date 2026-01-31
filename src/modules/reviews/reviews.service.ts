import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Review } from './review.entity';

@Injectable()
export class ReviewsService {
  constructor(@InjectRepository(Review) private repo: Repository<Review>) {}
  list() { return this.repo.find(); }
  create(data: Partial<Review>) { return this.repo.save(this.repo.create(data)); }
}
