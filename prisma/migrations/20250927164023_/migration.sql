/*
  Warnings:

  - A unique constraint covering the columns `[assignedToUserId]` on the table `Issue` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `issue` ADD COLUMN `assignedToUserId` VARCHAR(255) NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Issue_assignedToUserId_key` ON `Issue`(`assignedToUserId`);

-- AddForeignKey
ALTER TABLE `Issue` ADD CONSTRAINT `Issue_assignedToUserId_fkey` FOREIGN KEY (`assignedToUserId`) REFERENCES `users`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
