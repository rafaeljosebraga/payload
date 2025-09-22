import * as migration_20250922_142402 from './20250922_142402';

export const migrations = [
  {
    up: migration_20250922_142402.up,
    down: migration_20250922_142402.down,
    name: '20250922_142402'
  },
];
