import { DataSource } from 'typeorm';
import { config } from './config.ts';
import { DataSourceOptions } from 'typeorm/browser';
import path from 'path';

const {
  db: { type, database, port, host, username, password },
} = config;

const baseDir = path.resolve(import.meta.dirname, '../');

export const dataSource = new DataSource({
  type,
  database,
  port,
  host,
  username,
  password,
  logging: true,
  synchronize: true,
  entities: [baseDir + '/models/*.ts'],
} as DataSourceOptions);
