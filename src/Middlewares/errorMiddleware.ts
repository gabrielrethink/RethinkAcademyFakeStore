import { NextFunction, Request, Response } from "express";
import { StatusCodes, ReasonPhrases } from "http-status-codes";

const errorMiddleware = (
  err: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  const errorCode = res.locals.errorCode || StatusCodes.INTERNAL_SERVER_ERROR;

  if (err instanceof Error) {
    const errorMessage = err.message
      ? err.message
      : ReasonPhrases.INTERNAL_SERVER_ERROR;

    res.status(errorCode).json({
      error: ReasonPhrases.INTERNAL_SERVER_ERROR,
      message: errorMessage,
      stack: err.stack,
    });
  }
};

export { errorMiddleware };
