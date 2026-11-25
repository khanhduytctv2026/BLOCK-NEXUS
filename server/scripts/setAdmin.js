import 'dotenv/config';
import mongoose from 'mongoose';
import UserScore from '../models/UserScore.js';

const username = String(process.argv[2] || '').trim();
const roleArg = String(process.argv[3] || 'ADMIN').toUpperCase();

if (!username || !['ADMIN', 'USER'].includes(roleArg)) {
  console.error('Usage: node scripts/setAdmin.js <username> [ADMIN|USER]');
  process.exit(1);
}

if (!process.env.MONGODB_URI) {
  console.error('Error: MONGODB_URI is not set in server/.env');
  process.exit(1);
}

async function run() {
  await mongoose.connect(process.env.MONGODB_URI);
  const updated = await UserScore.findOneAndUpdate(
    { usernameLower: username.toLowerCase() },
    { $set: { role: roleArg } },
    { new: true }
  );

  if (!updated) {
    console.error(`Account "${username}" not found.`);
    await mongoose.disconnect();
    process.exit(1);
  }

  console.log(`Updated "${updated.username}" -> role=${updated.role} (coins=${updated.coins})`);
  await mongoose.disconnect();
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
