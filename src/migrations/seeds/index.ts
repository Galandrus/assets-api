import { ulid } from 'ulid';
import { Asset } from '../../entities/asset';
import { AssetHistory } from '../../entities/assetHistory';

export const AssetSeeds: Asset[] = [
    {
        id: `ASSET-${ulid()}`,
        name: 'Flixxo',
        description: 'A cryptocurrency of Flixxo, the platform for microseries from around the world.',
        value: 0.0009434,
        type: 'crypto',
        code: 'FLIXX',
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        id: `ASSET-${ulid()}`,
        name: 'Bitcoin',
        description: 'Bitcoin is a consensual network that enables a new payment system and a fully digital currency',
        value: 21312.9,
        type: 'crypto',
        code: 'BTC',
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        id: `ASSET-${ulid()}`,
        name: 'Ether',
        description: 'it is a token that is specifically used on the ethereum blockchain to pay for transactions.',
        value: 1579.83,
        type: 'crypto',
        code: 'ETH',
        createdAt: new Date(),
        updatedAt: new Date(),
    },
];

export const AssetHistorySeeds: Omit<AssetHistory, 'id'>[] = [
    {
        assetId: AssetSeeds[0].id,
        createdAt: new Date(),
        value: 0.0009267,
    },
    {
        assetId: AssetSeeds[0].id,
        createdAt: new Date(),
        value: 0.0009372,
    },
    {
        assetId: AssetSeeds[0].id,
        createdAt: new Date(),
        value: 0.0009434,
    },
    {
        assetId: AssetSeeds[1].id,
        createdAt: new Date(),
        value: 23352.9,
    },
    {
        assetId: AssetSeeds[1].id,
        createdAt: new Date(),
        value: 22412.9,
    },
    {
        assetId: AssetSeeds[1].id,
        createdAt: new Date(),
        value: 21312.9,
    },
    {
        assetId: AssetSeeds[2].id,
        createdAt: new Date(),
        value: 1211.21,
    },
    {
        assetId: AssetSeeds[2].id,
        createdAt: new Date(),
        value: 1497.62,
    },
    {
        assetId: AssetSeeds[2].id,
        createdAt: new Date(),
        value: 1579.83,
    },
];
