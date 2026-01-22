import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersService } from './users/users.service';

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
export class AppModule {
  constructor(
    private usersService: UsersService,
    private configService: ConfigService
  ) { }

  async onModuleInit() {
    const adminEmail = this.configService.get<string>('ADMIN_EMAIL');
    const adminPassword = this.configService.get<string>('ADMIN_PASSWORD');

    if (adminEmail && adminPassword) {
      await this.usersService.seedAdmin({
        email: adminEmail,
        password: adminPassword,
        fullName: 'Super Admin',
        phone: '0000000000',
        community: 'other',
        address: 'Admin HQ',
        city: 'Admin City',
        state: 'Delhi',
        country: 'India',
        age: 25,
        gender: 'other',
        idCardGenerated: true,
        isDocumentVerified: true
      });
    } else {
      console.warn('Admin credentials not found in env. Skipping admin seeding.');
    }
  }
}
