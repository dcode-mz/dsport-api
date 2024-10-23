-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_country" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "logo" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_country" ("createdAt", "id", "logo", "name", "updatedAt") SELECT "createdAt", "id", "logo", "name", "updatedAt" FROM "country";
DROP TABLE "country";
ALTER TABLE "new_country" RENAME TO "country";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
