const fs = require('fs');
const path = require('path');
const { spawnSync } = require('child_process');

const EXERCISES_DIR = path.join(__dirname, 'exercises');

function getDrills() {
  if (!fs.existsSync(EXERCISES_DIR)) return [];
  return fs.readdirSync(EXERCISES_DIR)
    .filter(file => {
      const fullPath = path.join(EXERCISES_DIR, file);
      return fs.statSync(fullPath).isDirectory() && fs.existsSync(path.join(fullPath, 'test.js'));
    })
    .sort();
}

function printHelp(drills) {
  console.log('\n======================================================');
  console.log('       NODE.JS TECHNICAL INTERVIEW DRILLS RUNNER       ');
  console.log('======================================================');
  console.log('Usage:');
  console.log('  node runner.js <drill-number-or-name>              Run tests for starter.js');
  console.log('  node runner.js <drill-number-or-name> --solution   Run tests for solution.js');
  console.log('  node runner.js all [--solution]                    Run tests for all drills');
  console.log('  node runner.js list                                List all available drills\n');
  console.log('Flags:');
  console.log('  --solution, -s    Validate solution.js instead of starter.js\n');
  console.log('Available Drills:');
  drills.forEach((drill, idx) => {
    console.log(`  [${String(idx + 1).padStart(2, '0')}] ${drill}`);
  });
  console.log('======================================================\n');
}

const args = process.argv.slice(2);
const drills = getDrills();

const isSolution = args.includes('--solution') || args.includes('-s');
const cleanArgs = args.filter(a => a !== '--solution' && a !== '-s');

if (cleanArgs.length === 0 || cleanArgs[0] === 'list' || cleanArgs[0] === '--help') {
  printHelp(drills);
  process.exit(0);
}

const target = cleanArgs[0].toLowerCase();
const testEnv = { ...process.env };
if (isSolution) {
  testEnv.TEST_SOLUTION = '1';
}

if (target === 'all') {
  console.log(`\n🚀 Running validation across ALL drills [Target: ${isSolution ? 'solution.js' : 'starter.js'}]...\n`);
  const res = spawnSync('node', ['--test', '--test-reporter=spec', 'exercises/**/test.js'], {
    stdio: 'inherit',
    cwd: __dirname,
    env: testEnv
  });
  process.exit(res.status || 0);
}

// Find matching drill by index or partial string match
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

console.log(`\n🧪 Testing Drill: ${matched} [Target: ${isSolution ? 'solution.js' : 'starter.js'}]...\n`);
const testPath = path.join('exercises', matched, 'test.js');
const res = spawnSync('node', ['--test', '--test-reporter=spec', testPath], {
  stdio: 'inherit',
  cwd: __dirname,
  env: testEnv
});
process.exit(res.status || 0);
