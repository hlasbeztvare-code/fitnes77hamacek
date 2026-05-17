
import { syncWithShoptet } from '../lib/sync/shoptet';
import dotenv from 'dotenv';

dotenv.config();

async function main() {
  console.log('🔄 Starting manual sync with Shoptet...');
  const result = await syncWithShoptet();
  if (result.success) {
    console.log(`✅ Sync successful! Synchronized ${result.count} products.`);
  } else {
    console.error('❌ Sync failed:', result.error);
  }
  process.exit(result.success ? 0 : 1);
}

main();
