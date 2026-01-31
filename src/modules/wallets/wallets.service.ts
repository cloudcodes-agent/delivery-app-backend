import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Wallet } from './wallet.entity';

@Injectable()
export class WalletsService {
  constructor(@InjectRepository(Wallet) private repo: Repository<Wallet>) {}

  findByUser(user_id: string) { return this.repo.findOne({ where: { user_id } }); }
  ensure(user_id: string) { return this.repo.save(this.repo.create({ user_id, balance: 0 })); }
  update(user_id: string, data: Partial<Wallet>) { return this.repo.update({ user_id }, data); }
}
