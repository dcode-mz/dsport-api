-- CreateTable
CREATE TABLE "_UserSport" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,
    CONSTRAINT "_UserSport_A_fkey" FOREIGN KEY ("A") REFERENCES "sport" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_UserSport_B_fkey" FOREIGN KEY ("B") REFERENCES "users" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "_UserSport_AB_unique" ON "_UserSport"("A", "B");

-- CreateIndex
CREATE INDEX "_UserSport_B_index" ON "_UserSport"("B");
