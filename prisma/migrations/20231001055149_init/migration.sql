-- CreateTable
CREATE TABLE "Merchant" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" VARCHAR(255) NOT NULL,
    "publicKey" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "contact" BIGINT NOT NULL,
    "verified" BOOLEAN NOT NULL,

    CONSTRAINT "Merchant_pkey" PRIMARY KEY ("id")
);
