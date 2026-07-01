import { DataSource, DataSourceOptions } from 'typeorm';
import { config } from './config';

import path from 'path';

const {
  db: { type, database, port, host, username, password },
} = config;

const baseDir = path.resolve(__dirname, '../');

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
