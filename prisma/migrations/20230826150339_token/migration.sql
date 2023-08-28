-- AlterTable
ALTER TABLE "Category" ALTER COLUMN "id" SET DEFAULT concat('cat_', replace(cast(gen_random_uuid() as text ), '-', ''));

-- AlterTable
ALTER TABLE "Dishe" ALTER COLUMN "id" SET DEFAULT concat('dis_', replace(cast(gen_random_uuid() as text ), '-', ''));

-- AlterTable
ALTER TABLE "Restaurant" ALTER COLUMN "id" SET DEFAULT concat('res_', replace(cast(gen_random_uuid() as text ), '-', ''));

-- AlterTable
ALTER TABLE "Tenant" ALTER COLUMN "id" SET DEFAULT concat('tnt_', replace(cast(gen_random_uuid() as text ), '-', ''));

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "id" SET DEFAULT concat('usr_', replace(cast(gen_random_uuid() as text ), '-', '')),
ALTER COLUMN "activeToken" DROP DEFAULT;
