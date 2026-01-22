import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { CompaniesModule } from '../companies/companies.module';
import { SchemesModule } from '../schemes/schemes.module';
import { User, UserSchema } from '../schemas/user.schema';
import { Analytics, AnalyticsSchema } from '../schemas/analytics.schema';
import { Transaction, TransactionSchema } from '../schemas/wallet.schema';

@Module({
  imports: [
    CompaniesModule,
    SchemesModule,
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Analytics.name, schema: AnalyticsSchema },
      { name: Transaction.name, schema: TransactionSchema }
    ])
  ],
  controllers: [AdminController],
  providers: [AdminService],
  exports: [AdminService]
})
export class AdminModule { }
