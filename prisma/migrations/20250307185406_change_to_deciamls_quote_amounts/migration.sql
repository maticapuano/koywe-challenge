/*
  Warnings:

  - You are about to alter the column `amount` on the `quotes` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Decimal(28,18)`.
  - You are about to alter the column `rate` on the `quotes` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Decimal(28,18)`.
  - You are about to alter the column `converted_amount` on the `quotes` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Decimal(28,18)`.

*/
-- AlterTable
ALTER TABLE "quotes" ALTER COLUMN "from" SET DATA TYPE CHAR(4),
ALTER COLUMN "amount" SET DATA TYPE DECIMAL(28,18),
ALTER COLUMN "rate" SET DATA TYPE DECIMAL(28,18),
ALTER COLUMN "converted_amount" SET DATA TYPE DECIMAL(28,18);
