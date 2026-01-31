import { Module } from '@nestjs/common';
import { TypeOrmModule } from 'typeorm';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { OrdersModule } from './orders/orders.module';
import { WalletsModule } from './wallets/wallets.module';
import { MessagesModule } from './messages/messages.module';
import { ReviewsModule } from './reviews/reviews.module';
import { BidsModule } from './bids/bids.module';
import { EventsModule } from '../realtime/events.module';

const isDbUrl = !!process.env.DATABASE_URL;

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      ...(isDbUrl
        ? { url: process.env.DATABASE_URL }
        : {
            host: process.env.DB_HOST || 'localhost',
            port: parseInt(process.env.DB_PORT || '5432', 10),
            username: process.env.DB_USER || 'postgres',
            password: process.env.DB_PASSWORD || 'postgres',
            database: process.env.DB_NAME || 'delivery_app',
          }),
      autoLoadEntities: true,
      synchronize: true,
    }),
    UsersModule,
    AuthModule,
    OrdersModule,
    WalletsModule,
    MessagesModule,
    ReviewsModule,
    BidsModule,
    EventsModule,
  ],
})
export class AppModule {}
