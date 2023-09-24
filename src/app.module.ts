import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ProvisionController } from './controllers/provision.controller';
import { AppService } from './service/app.service';
import { ProvisionService } from './service/provision.service';

@Module({
  imports: [],
  controllers: [AppController, ProvisionController],
  providers: [AppService, ProvisionService],
})
export class AppModule {}
