import * as migration_20250923_185204 from './20250923_185204';

export const migrations = [
  {
    up: migration_20250923_185204.up,
    down: migration_20250923_185204.down,
    name: '20250923_185204'
  },
];
