import * as migration_20250701_132246 from './20250701_132246';

export const migrations = [
  {
    up: migration_20250701_132246.up,
    down: migration_20250701_132246.down,
    name: '20250701_132246'
  },
];
