import { Injectable, OnModuleDestroy } from '@nestjs/common';
import { drizzle, NodePgDatabase } from 'drizzle-orm/node-postgres';
import { Pool, PoolConfig } from 'pg';
import * as schema from '../modules/users/users.schema';

@Injectable()
export class DatabaseService implements OnModuleDestroy {
  readonly db: NodePgDatabase<typeof schema>;

  private readonly pool: Pool;

  constructor() {
    this.pool = new Pool(this.createConnectionOptions());
    this.db = drizzle({ client: this.pool, schema });
  }

  async onModuleDestroy() {
    await this.pool.end();
  }

  private createConnectionOptions(): PoolConfig {
    return {
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    };
  }
}
