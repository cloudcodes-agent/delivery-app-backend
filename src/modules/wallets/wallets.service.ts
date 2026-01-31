import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Wallet } from './wallet.entity';
import { EventsGateway } from '../../realtime/events.gateway';

@Injectable()
export class WalletsService {
  constructor(@InjectRepository(Wallet) private repo: Repository<Wallet>, private events: EventsGateway) {}

  findByUser(user_id: string) { return this.repo.findOne({ where: { user_id } }); }
  async ensure(user_id: string) { const saved = await this.repo.save(this.repo.create({ user_id, balance: 0 })); this.events.emit('wallets.updated', saved); return saved; }
  async update(user_id: string, data: Partial<Wallet>) { await this.repo.update({ user_id }, data); const updated = await this.findByUser(user_id); this.events.emit('wallets.updated', updated); return updated; }
}
