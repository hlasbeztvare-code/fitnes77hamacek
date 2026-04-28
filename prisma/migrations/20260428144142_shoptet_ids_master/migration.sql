/*
  Warnings:

  - You are about to drop the column `compareAtPrice` on the `Product` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Product" DROP COLUMN "compareAtPrice",
ADD COLUMN     "ingredients" TEXT,
ADD COLUMN     "nutrition" JSONB,
ADD COLUMN     "oldPrice" DOUBLE PRECISION,
ADD COLUMN     "shoptetId" TEXT,
ADD COLUMN     "shoptetPriceId" TEXT,
ADD COLUMN     "shoptetProductId" TEXT,
ADD COLUMN     "variants" JSONB,
ALTER COLUMN "shortDescription" DROP NOT NULL,
ALTER COLUMN "description" DROP NOT NULL,
ALTER COLUMN "image" DROP NOT NULL,
ALTER COLUMN "category" DROP NOT NULL;
