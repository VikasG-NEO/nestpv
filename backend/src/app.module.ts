import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { CompaniesModule } from './companies/companies.module';
import { WalletModule } from './wallet/wallet.module';
import { SchemesModule } from './schemes/schemes.module';
import { BankAccountsModule } from './bank-accounts/bank-accounts.module';
import { CommunitiesModule } from './communities/communities.module';
import { AdminModule } from './admin/admin.module';
import { TransactionsModule } from './transactions/transactions.module';

@Module({
  imports: [
    // Load .env explicitly
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),

    // MongoDB connection
    MongooseModule.forRootAsync({
      useFactory: () => {
        if (!process.env.MONGODB_URI) {
          throw new Error('❌ MONGODB_URI is not defined in .env');
        }

        return {
          uri: process.env.MONGODB_URI,
          // Fix for "SSL alert number 80" / "internal error" on some networks
          family: 4, // Force IPv4
          serverSelectionTimeoutMS: 5000,
          socketTimeoutMS: 45000,
        };
      },
    }),

    AuthModule,
    UsersModule,
    CompaniesModule,
    WalletModule,
    SchemesModule,
    BankAccountsModule,
    CommunitiesModule,
    AdminModule,
    TransactionsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
