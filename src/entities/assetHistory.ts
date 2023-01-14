import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Asset } from './asset';

@Entity('AssetHistory')
export class AssetHistory {
    @PrimaryGeneratedColumn()
    id: number;

    @Column('text')
    assetId: string;

    @Column('double')
    value: number;

    @Column('datetime')
    createdAt: Date;
}
