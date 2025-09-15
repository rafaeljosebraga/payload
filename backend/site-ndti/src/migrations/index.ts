import * as migration_20250716_193918 from './20250716_193918';
import * as migration_20250915_120000 from './20250915_120000';

export const migrations = [
  {
    up: migration_20250716_193918.up,
    down: migration_20250716_193918.down,
    name: '20250716_193918',
  },
  {
    up: migration_20250915_120000.up,
    down: migration_20250915_120000.down,
    name: '20250915_120000',
  },
];
