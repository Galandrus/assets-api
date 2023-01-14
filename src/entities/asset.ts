import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('Asset')
export class Asset {
    @PrimaryColumn('varchar')
    id: string;

    @Column('text')
    name: string;

    @Column('text')
    description: string;

    @Column('double')
    value: number;

    @Column('datetime')
    createdAt: Date;

    @Column('datetime')
    updatedAt: Date;
}
