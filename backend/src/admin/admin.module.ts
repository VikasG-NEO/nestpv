import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { CompaniesModule } from '../companies/companies.module';
import { SchemesModule } from '../schemes/schemes.module';

@Module({
  imports: [CompaniesModule, SchemesModule],
  controllers: [AdminController],
  providers: [AdminService]
})
export class AdminModule { }
