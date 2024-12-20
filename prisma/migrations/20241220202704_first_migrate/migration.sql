-- CreateTable
CREATE TABLE "User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "bal" INTEGER NOT NULL,
    "email" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "UserIdentifier" (
    "email" TEXT NOT NULL PRIMARY KEY,
    "id" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "User_id_key" ON "User"("id");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "UserIdentifier_email_key" ON "UserIdentifier"("email");

-- CreateIndex
CREATE UNIQUE INDEX "UserIdentifier_id_key" ON "UserIdentifier"("id");
