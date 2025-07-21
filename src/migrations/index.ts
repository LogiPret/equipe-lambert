import * as migration_20250714_175425_initial from './20250714_175425_initial';
import * as migration_20250721_160245 from './20250721_160245';

export const migrations = [
  {
    up: migration_20250714_175425_initial.up,
    down: migration_20250714_175425_initial.down,
    name: '20250714_175425_initial',
  },
  {
    up: migration_20250721_160245.up,
    down: migration_20250721_160245.down,
    name: '20250721_160245'
  },
];
