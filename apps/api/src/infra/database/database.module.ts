import { Module, Global } from '@nestjs/common';
import { db } from '@praxis/core/infra';

export const DRIZZLE = 'DRIZZLE_PROVIDER';

@Global()
@Module({
  providers: [
    {
      provide: DRIZZLE,
      useValue: db,
    },
  ],
  exports: [DRIZZLE],
})
export class DatabaseModule {}