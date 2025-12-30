-- CreateTable
CREATE TABLE "Sellers" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,

    CONSTRAINT "Sellers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Products" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "stock" INTEGER,
    "description" TEXT,
    "sellerId" TEXT NOT NULL,

    CONSTRAINT "Products_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Products" ADD CONSTRAINT "Products_sellerId_fkey" FOREIGN KEY ("sellerId") REFERENCES "Sellers"("id") ON DELETE CASCADE ON UPDATE CASCADE;
