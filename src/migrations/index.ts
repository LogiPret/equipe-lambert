import * as migration_20250721_160245 from './20250721_160245'
import * as migration_20250723_202203_contact_block_checkbox from './20250723_202203_contact_block_checkbox'
import * as migration_20250730_141058 from './20250730_141058'

export const migrations = [
  {
    up: migration_20250721_160245.up,
    down: migration_20250721_160245.down,
    name: '20250721_160245',
  },
  {
    up: migration_20250723_202203_contact_block_checkbox.up,
    down: migration_20250723_202203_contact_block_checkbox.down,
    name: '20250723_202203_contact_block_checkbox',
  },
  {
    up: migration_20250730_141058.up,
    down: migration_20250730_141058.down,
    name: '20250730_141058',
  },
]
