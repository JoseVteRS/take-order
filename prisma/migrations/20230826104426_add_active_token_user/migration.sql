/*
  Warnings:

  - The `role` column on the `User` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "Role" AS ENUM ('OWNER', 'ADMIN', 'BILLING', 'USER', 'TRACKER', 'VIEWER');

-- AlterTable
ALTER TABLE "Category" ALTER COLUMN "id" SET DEFAULT concat('cat_', replace(cast(gen_random_uuid() as text ), '-', ''));

-- AlterTable
ALTER TABLE "Dishe" ALTER COLUMN "id" SET DEFAULT concat('dis_', replace(cast(gen_random_uuid() as text ), '-', ''));

-- AlterTable
ALTER TABLE "Restaurant" ALTER COLUMN "id" SET DEFAULT concat('res_', replace(cast(gen_random_uuid() as text ), '-', ''));

-- AlterTable
ALTER TABLE "Tenant" ALTER COLUMN "id" SET DEFAULT concat('tnt_', replace(cast(gen_random_uuid() as text ), '-', ''));

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "active" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "activeToken" TEXT,
ALTER COLUMN "id" SET DEFAULT concat('usr_', replace(cast(gen_random_uuid() as text ), '-', '')),
DROP COLUMN "role",
ADD COLUMN     "role" "Role" NOT NULL DEFAULT 'OWNER';
