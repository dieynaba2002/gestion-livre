-- DropIndex
DROP INDEX `Book_userId_fkey` ON `book`;

-- AlterTable
ALTER TABLE `book` MODIFY `photoUrl` VARCHAR(191) NULL;

-- AddForeignKey
ALTER TABLE `Book` ADD CONSTRAINT `Book_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
