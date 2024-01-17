/*
  Warnings:

  - The values [client,worker] on the enum `user_type` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `status` on the `user` table. All the data in the column will be lost.
  - You are about to drop the `billing` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `work` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "post_type" AS ENUM ('daily', 'weekly', 'monthly');

-- CreateEnum
CREATE TYPE "pay_type" AS ENUM ('HUMO', 'UZCARD');

-- AlterEnum
BEGIN;
CREATE TYPE "user_type_new" AS ENUM ('customer', 'seller', 'guest');
ALTER TABLE "user" ALTER COLUMN "type" DROP DEFAULT;
ALTER TABLE "user" ALTER COLUMN "type" TYPE "user_type_new" USING ("type"::text::"user_type_new");
ALTER TYPE "user_type" RENAME TO "user_type_old";
ALTER TYPE "user_type_new" RENAME TO "user_type";
DROP TYPE "user_type_old";
ALTER TABLE "user" ALTER COLUMN "type" SET DEFAULT 'guest';
COMMIT;

-- DropForeignKey
ALTER TABLE "billing" DROP CONSTRAINT "billing_user_id_fkey";

-- DropForeignKey
ALTER TABLE "work" DROP CONSTRAINT "work_user_id_fkey";

-- AlterTable
ALTER TABLE "user" DROP COLUMN "status";

-- DropTable
DROP TABLE "billing";

-- DropTable
DROP TABLE "work";

-- DropEnum
DROP TYPE "billing_type";

-- DropEnum
DROP TYPE "user_status";

-- DropEnum
DROP TYPE "work_status";

-- CreateTable
CREATE TABLE "post" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "title" VARCHAR(255) NOT NULL,
    "description" TEXT NOT NULL,
    "address" VARCHAR(255),
    "type" "post_type" NOT NULL DEFAULT 'daily',
    "user_id" UUID NOT NULL,
    "contact_info" VARCHAR(255) NOT NULL,
    "created_at" TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMP(0),

    CONSTRAINT "post_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "payment" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "title" INTEGER NOT NULL,
    "description" TEXT NOT NULL,
    "type" "pay_type" NOT NULL,
    "user_id" UUID NOT NULL,
    "work_id" UUID NOT NULL,
    "created_at" TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMP(0),

    CONSTRAINT "payment_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "post" ADD CONSTRAINT "post_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "payment" ADD CONSTRAINT "payment_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION;
