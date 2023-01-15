import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

@Entity('AssetHistory')
export class AssetHistory {
    @PrimaryGeneratedColumn()
    id: number;

    @Column('varchar')
    assetId: string;

    @Column('double')
    value: number;

    @Column('datetime')
    createdAt: Date;
}
