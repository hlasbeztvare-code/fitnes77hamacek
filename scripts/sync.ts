import { syncWithShoptet } from '../src/lib/sync/shoptet';

async function main() {
  console.log("🔄 Starting sync...");
  const result = await syncWithShoptet();
  console.log("✅ Sync finished:", result);
}

main().catch(console.error);
