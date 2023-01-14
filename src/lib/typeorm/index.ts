import { DataSource } from 'typeorm';
import config from '../../config';

export const TypeOrmDataSource = new DataSource({
    type: 'mysql',
    host: config.MYSQL_HOST,
    port: Number(config.MYSQL_PORT),
    username: config.MYSQL_USERNAME,
    password: config.MYSQL_PASS,
    database: config.MYSQL_DATABASE,
    synchronize: true,
    logging: true,
    entities: [],
    subscribers: [],
    migrations: [],
});
