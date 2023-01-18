import { MigrationInterface, QueryRunner } from 'typeorm';
import { Asset } from '../entities/asset';
import { AssetHistory } from '../entities/assetHistory';
import { AssetHistorySeeds, AssetSeeds } from './seeds';

export class addSeeds1673996435947 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.manager.getRepository(Asset).save(AssetSeeds);
        await queryRunner.manager.getRepository(AssetHistory).save(AssetHistorySeeds);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {}
}
