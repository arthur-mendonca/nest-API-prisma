import { DataBaseError } from "../types/DataBaseError";
import { PrismaClientError } from "../types/PrismaClientError";
import { UniqueConstraintError } from "../types/UniqueConstraintError";

enum PrismaErrors {
  UniqueConstraintFail = "P2002",
}

export const handleDatabaseErrors = (error: PrismaClientError): Error => {
  switch (error.code) {
    case PrismaErrors.UniqueConstraintFail:
      return new UniqueConstraintError(error);

    default:
      return new DataBaseError(error.message);
  }
};
