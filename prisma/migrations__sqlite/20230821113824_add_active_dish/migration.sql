-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Dishe" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "price" INTEGER NOT NULL DEFAULT 0,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "restaurantId" TEXT NOT NULL,
    "categoryId" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME,
    CONSTRAINT "Dishe_restaurantId_fkey" FOREIGN KEY ("restaurantId") REFERENCES "Restaurant" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Dishe_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Dishe" ("categoryId", "createdAt", "description", "id", "name", "price", "restaurantId", "updatedAt") SELECT "categoryId", "createdAt", "description", "id", "name", "price", "restaurantId", "updatedAt" FROM "Dishe";
DROP TABLE "Dishe";
ALTER TABLE "new_Dishe" RENAME TO "Dishe";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
