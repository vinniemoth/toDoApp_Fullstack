-- DropIndex
DROP INDEX "User_name_key";

-- CreateTable
CREATE TABLE "SubTodo" (
    "id" SERIAL NOT NULL,
    "subtask" TEXT NOT NULL,
    "completed" BOOLEAN NOT NULL DEFAULT false,
    "todoId" INTEGER NOT NULL,

    CONSTRAINT "SubTodo_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "SubTodo" ADD CONSTRAINT "SubTodo_todoId_fkey" FOREIGN KEY ("todoId") REFERENCES "Todo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
