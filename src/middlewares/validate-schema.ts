
import { Request, Response, NextFunction } from "express";
import { ZodType } from "zod";

type RequestTarget = "body" | "query" | "params";

export const validate =
  (schema: ZodType, target: RequestTarget = "body") =>
  (req: Request, res: Response, next: NextFunction): void => {
    const result = schema.safeParse(req[target]);

    if (!result.success) {
      const fieldErrors = result.error.issues.map((issue) => ({
        field: issue.path.join("."),
        message: issue.message,
      }));

      res.status(400).json({
        code: 400,
        message: "Validation error",
        errors: fieldErrors,
      });
      return;
    }

    req[target] = result.data as any;
    next();
  };