/*
  Warnings:

  - Added the required column `photoUrl` to the `Book` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `Book_userId_fkey` ON `book`;

-- AlterTable
ALTER TABLE `book` ADD COLUMN `photoUrl` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `Book` ADD CONSTRAINT `Book_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
