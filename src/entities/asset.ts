import { Column, Entity, Index, PrimaryColumn } from 'typeorm';

@Entity('Asset')
export class Asset {
    @PrimaryColumn('varchar')
    id: string;

    @Column('text')
    name: string;

    @Column('varchar')
    @Index({ unique: true })
    code: string;

    @Column('text')
    description: string;

    @Column('text')
    type: string;

    @Column('double')
    value: number;

    @Column('datetime')
    createdAt: Date;

    @Column('datetime')
    updatedAt: Date;
}
