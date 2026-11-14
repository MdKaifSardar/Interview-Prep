const fs = require('fs');
const path = require('path');
const { spawnSync } = require('child_process');
const { DatabaseSync } = require('node:sqlite');

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
  console.log('       SQL TECHNICAL INTERVIEW DRILLS RUNNER          ');
  console.log('======================================================');
  console.log('Usage:');
  console.log('  node runner.js <drill-number-or-name>         Run tests for a single drill');
  console.log('  node runner.js <drill-number-or-name> --run   Execute query & view ASCII output table');
  console.log('  node runner.js all                            Run tests for all drills');
  console.log('  node runner.js list                           List all available drills\n');
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
const isRunOnly = args.includes('--run');
const isSolution = args.includes('--solution');

if (target === 'all') {
  console.log('\n🚀 Running validation across ALL SQL drills...\n');
  const res = spawnSync('node', ['--test', 'exercises/**/test.js'], {
    stdio: 'inherit',
    cwd: __dirname
  });
  process.exit(res.status || 0);
}

if (target === 'test-solutions') {
  console.log('\n🚀 Running validation against REFERENCE SOLUTIONS across ALL drills...\n');
  const res = spawnSync('node', ['--test', 'exercises/**/test.js'], {
    stdio: 'inherit',
    cwd: __dirname,
    env: { ...process.env, TEST_SOLUTION: '1' }
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

const drillDir = path.join(EXERCISES_DIR, matched);

if (isRunOnly || isSolution) {
  const queryFileName = isSolution ? 'solution.sql' : 'starter.sql';
  console.log(`\n📊 Executing SQL query from: exercises/${matched}/${queryFileName}\n`);
  
  const schemaPath = path.join(drillDir, 'schema.sql');
  const queryPath = path.join(drillDir, queryFileName);

  if (!fs.existsSync(queryPath)) {
    console.error(`❌ Query file not found: ${queryPath}`);
    process.exit(1);
  }

  const schemaSql = fs.readFileSync(schemaPath, 'utf8');
  const rawQuery = fs.readFileSync(queryPath, 'utf8');
  const cleanQuery = rawQuery.replace(/--.*$/gm, '').trim();

  if (!cleanQuery) {
    console.log(`⚠️  ${queryFileName} is empty! Please write your SELECT query in that file.\n`);
    process.exit(0);
  }

  try {
    const db = new DatabaseSync(':memory:');
    db.exec(schemaSql);
    const rows = db.prepare(cleanQuery).all();
    console.log(`✅ Query returned ${rows.length} row(s):\n`);
    if (rows.length > 0) {
      console.table(rows);
    } else {
      console.log('(Empty result set)');
    }
  } catch (err) {
    console.error(`❌ SQL Execution Error: ${err.message}\n`);
    process.exit(1);
  }
  process.exit(0);
}

console.log(`\n🧪 Testing SQL Drill: ${matched}...\n`);
const testPath = path.join('exercises', matched, 'test.js');
const res = spawnSync('node', ['--test', testPath], {
  stdio: 'inherit',
  cwd: __dirname,
  env: process.env
});
process.exit(res.status || 0);
