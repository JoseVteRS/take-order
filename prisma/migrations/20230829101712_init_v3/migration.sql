/*
  Warnings:

  - The `allergens` column on the `Dishe` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Dishe" DROP COLUMN "allergens",
ADD COLUMN     "allergens" TEXT[] DEFAULT ARRAY[]::TEXT[];
