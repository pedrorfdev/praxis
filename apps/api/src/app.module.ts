import { Module } from '@nestjs/common';
import { DatabaseModule } from './infra/database/database.module';
import { ClinicsModule } from './modules/clinics/clinics.module';
import { HealthController } from './modules/health/health.controller';

@Module({
  imports: [
    DatabaseModule,
    ClinicsModule,
    HealthController
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}