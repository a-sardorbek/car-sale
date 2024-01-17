-- CreateExtension
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- CreateEnum
CREATE TYPE "work_status" AS ENUM ('new', 'confirmed', 'finished');

-- CreateEnum
CREATE TYPE "user_status" AS ENUM ('active', 'inactive');

-- CreateEnum
CREATE TYPE "user_type" AS ENUM ('client', 'worker', 'guest');

-- CreateEnum
CREATE TYPE "billing_type" AS ENUM ('UZCARD', 'HUMO', 'MASTERCARD', 'VISA');

-- CreateTable
CREATE TABLE "user" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "full_name" VARCHAR(255) NOT NULL,
    "user_name" VARCHAR(255) NOT NULL,
    "phone" VARCHAR(15),
    "status" "user_status" NOT NULL DEFAULT 'inactive',
    "type" "user_type" NOT NULL DEFAULT 'guest',
    "created_at" TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMP(0),

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "work" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "title" VARCHAR(255) NOT NULL,
    "description" TEXT NOT NULL,
    "address" VARCHAR(255),
    "status" "work_status" NOT NULL DEFAULT 'new',
    "user_id" UUID NOT NULL,
    "created_at" TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMP(0),

    CONSTRAINT "work_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "billing" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "title" INTEGER NOT NULL,
    "description" TEXT NOT NULL,
    "address" VARCHAR(255),
    "type" "billing_type" NOT NULL,
    "user_id" UUID NOT NULL,
    "work_id" UUID NOT NULL,
    "created_at" TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMP(0),

    CONSTRAINT "billing_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "work" ADD CONSTRAINT "work_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "billing" ADD CONSTRAINT "billing_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION;
