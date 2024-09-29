import { DataSource, DataSourceOptions } from 'typeorm';

export const dataSourceOptions: DataSourceOptions = {
  type: 'mysql',
  host: 'localhost',
  port:+('3306'),
  username: 'root',
  password: '', // Add your password here
  database: 'social_dev',
  entities: ['dist/**/*.entity.js'],
  logging: ['query', 'error'],
  synchronize: true,};

const dataSource = new DataSource(dataSourceOptions);
export default dataSource;