import { NextFunction, Request, RequestHandler, Response } from 'express';

const catchAsync = (
  fn: (req: Request, res: Response, next: NextFunction) => any
): any => {
  return (req: Request, res: Response, next: NextFunction) => {
    fn(req, res, next).catch(next);
  };
};

export { catchAsync };
