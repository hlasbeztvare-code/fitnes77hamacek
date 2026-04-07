-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "shoptetOrderId" TEXT,
ADD COLUMN     "status" TEXT NOT NULL DEFAULT 'pending';

-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "salesCount" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "videoUrl" TEXT;
