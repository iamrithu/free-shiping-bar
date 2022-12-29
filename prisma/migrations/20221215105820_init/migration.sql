-- CreateTable
CREATE TABLE "shipbars" (
    "id" SERIAL NOT NULL,
    "uuid" VARCHAR(255) NOT NULL,
    "name" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "background" TEXT NOT NULL,
    "position" TEXT NOT NULL,
    "fontColor" TEXT NOT NULL,
    "specialTextColor" TEXT NOT NULL,
    "fontFamily" TEXT NOT NULL,
    "fontSize" TEXT NOT NULL,
    "closeButton" TEXT NOT NULL,
    "shipingGoal" TEXT NOT NULL,
    "currency" TEXT NOT NULL,
    "currencyPosition" TEXT NOT NULL,
    "currencyContent" TEXT NOT NULL,
    "isActive" TEXT NOT NULL DEFAULT 'false',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "shop" TEXT NOT NULL,

    CONSTRAINT "shipbars_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "shops" (
    "id" SERIAL NOT NULL,
    "uuid" VARCHAR(255) NOT NULL,
    "shopId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "animate" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "shops_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "shipbars_uuid_key" ON "shipbars"("uuid");

-- CreateIndex
CREATE UNIQUE INDEX "shops_uuid_key" ON "shops"("uuid");

-- CreateIndex
CREATE UNIQUE INDEX "shops_name_key" ON "shops"("name");
