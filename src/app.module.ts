import { Module } from '@nestjs/common';
import { QuotesModule } from './modules/quotes/quotes.module';
import { UsersModule } from './modules/users/users.module';
import { SharedModule } from './shared/shared.module';

@Module({
  imports: [SharedModule, UsersModule, QuotesModule],
})
export class AppModule {}
