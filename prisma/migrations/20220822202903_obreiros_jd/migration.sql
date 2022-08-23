-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "senha" TEXT NOT NULL,
    "profileImage" TEXT NOT NULL,
    "dataCriacao" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Chamada" (
    "id" SERIAL NOT NULL,
    "cracha" INTEGER NOT NULL,
    "status" TEXT NOT NULL,
    "dataCriacao" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Chamada_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Obreiros" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "cracha" INTEGER NOT NULL,

    CONSTRAINT "Obreiros_pkey" PRIMARY KEY ("id")
);
