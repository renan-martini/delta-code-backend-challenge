-- CreateTable
CREATE TABLE "transaction" (
    "id" UUID NOT NULL,
    "createdAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "value" DECIMAL(15,2) NOT NULL,
    "debitedAccountId" UUID,
    "receiverAccountId" UUID,

    CONSTRAINT "PK_89eadb93a89810556e1cbcd6ab9" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user" (
    "id" UUID NOT NULL,
    "email" VARCHAR NOT NULL,
    "password" VARCHAR NOT NULL,
    "firstName" VARCHAR NOT NULL,
    "lastName" VARCHAR NOT NULL,
    "pictureUrl" VARCHAR NOT NULL,
    "createdAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "balance" DECIMAL(15,2) NOT NULL DEFAULT 1000,

    CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "UQ_e12875dfb3b1d92d7d7c5377e22" ON "user"("email");

-- AddForeignKey
ALTER TABLE "transaction" ADD CONSTRAINT "FK_cacfcdb0d3076a1ad26ee59bbe6" FOREIGN KEY ("debitedAccountId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "transaction" ADD CONSTRAINT "FK_ccb13651bc84ebbf68cd3e48699" FOREIGN KEY ("receiverAccountId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
