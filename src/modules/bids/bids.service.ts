import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Bid } from './bid.entity';

@Injectable()
export class BidsService {
  constructor(@InjectRepository(Bid) private repo: Repository<Bid>) {}
  list(orderId?: string) {
    return orderId ? this.repo.find({ where: { orderId } }) : this.repo.find();
  }
  create(data: Partial<Bid>) { return this.repo.save(this.repo.create(data)); }
  update(id: string, data: Partial<Bid>) { return this.repo.update(id, data); }
}
