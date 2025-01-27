/*
  Warnings:

  - You are about to drop the column `nationality` on the `coach` table. All the data in the column will be lost.
  - Added the required column `nationalityId` to the `coach` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "coach" DROP COLUMN "nationality",
ADD COLUMN     "nationalityId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "coach" ADD CONSTRAINT "coach_nationalityId_fkey" FOREIGN KEY ("nationalityId") REFERENCES "country"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
