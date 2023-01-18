import { DataSource } from 'typeorm';
import config from '../../config';
import { Asset } from '../../entities/asset';
import { AssetHistory } from '../../entities/assetHistory';
import 'reflect-metadata';
import { addSeeds1673996435947 } from '../../migrations/1673996435947-add_seeds';

export const AppDataSource = new DataSource({
    type: 'mysql',
    host: config.MYSQL_HOST,
    port: Number(config.MYSQL_PORT),
    username: config.MYSQL_USERNAME,
    password: config.MYSQL_PASS,
    database: config.MYSQL_DATABASE,
    synchronize: true,
    logging: true,
    entities: [Asset, AssetHistory],
    subscribers: [],
    migrations: [addSeeds1673996435947],
});
