-- CreateTable
CREATE TABLE "formation_position" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "formationSchemeId" TEXT NOT NULL,
    "positionId" TEXT NOT NULL,
    "count" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "formation_position_formationSchemeId_fkey" FOREIGN KEY ("formationSchemeId") REFERENCES "formation_scheme" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "formation_position_positionId_fkey" FOREIGN KEY ("positionId") REFERENCES "position_field" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "formation_position_formationSchemeId_positionId_key" ON "formation_position"("formationSchemeId", "positionId");
