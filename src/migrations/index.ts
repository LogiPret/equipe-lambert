import * as migration_20250721_160245 from './20250721_160245';

export const migrations = [
  {
    up: migration_20250721_160245.up,
    down: migration_20250721_160245.down,
    name: '20250721_160245'
  },
];
