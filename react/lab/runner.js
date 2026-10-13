const fs = require('fs');
const path = require('path');
const { spawnSync } = require('child_process');

const EXERCISES_DIR = path.join(__dirname, 'src', 'exercises');

function getDrills() {
  if (!fs.existsSync(EXERCISES_DIR)) return [];
  return fs.readdirSync(EXERCISES_DIR)
    .filter(file => {
      const fullPath = path.join(EXERCISES_DIR, file);
      return fs.statSync(fullPath).isDirectory();
    })
    .sort();
}

function printHelp(drills) {
  console.log('\n======================================================');
  console.log('       REACT & NEXT.JS INTERVIEW DRILLS RUNNER         ');
  console.log('======================================================');
  console.log('Usage:');
  console.log('  node runner.js <drill-number-or-name>   Run tests for a single drill');
  console.log('  node runner.js all                     Run tests for all drills');
  console.log('  node runner.js list                    List all available drills\n');
  console.log('Available Drills:');
  drills.forEach((drill, idx) => {
    console.log(`  [${String(idx + 1).padStart(2, '0')}] ${drill}`);
  });
  console.log('======================================================\n');
}

const args = process.argv.slice(2);
const drills = getDrills();

if (args.length === 0 || args[0] === 'list' || args[0] === '--help') {
  printHelp(drills);
  process.exit(0);
}

const target = args[0].toLowerCase();

if (target === 'all') {
  console.log('\n🚀 Running validation across ALL React drills...\n');
  const npxCmd = process.platform === 'win32' ? 'npx.cmd' : 'npx';
  const res = spawnSync(npxCmd, ['vitest', 'run'], {
    stdio: 'inherit',
    cwd: __dirname,
    shell: true
  });
  process.exit(res.status || 0);
}

// Find matching drill
let matched = null;
const numeric = parseInt(target, 10);
if (!isNaN(numeric) && numeric >= 1 && numeric <= drills.length) {
  matched = drills[numeric - 1];
} else {
  matched = drills.find(d => d.toLowerCase().includes(target));
}

if (!matched) {
  console.error(`\n❌ No drill matched "${target}". Run "node runner.js list" to see options.\n`);
  process.exit(1);
}

console.log(`\n🧪 Testing Drill: ${matched}...\n`);
const npxCmd = process.platform === 'win32' ? 'npx.cmd' : 'npx';
const res = spawnSync(npxCmd, ['vitest', 'run', path.join('src', 'exercises', matched)], {
  stdio: 'inherit',
  cwd: __dirname,
  shell: true
});
process.exit(res.status || 0);
