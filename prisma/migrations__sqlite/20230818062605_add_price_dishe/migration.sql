-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Dishe" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "price" INTEGER NOT NULL DEFAULT 0,
    "restaurantId" TEXT,
    CONSTRAINT "Dishe_restaurantId_fkey" FOREIGN KEY ("restaurantId") REFERENCES "Restaurant" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Dishe" ("description", "id", "name", "restaurantId") SELECT "description", "id", "name", "restaurantId" FROM "Dishe";
DROP TABLE "Dishe";
ALTER TABLE "new_Dishe" RENAME TO "Dishe";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
